"use client"

import { useId } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import toast from "react-hot-toast"
import * as Yup from "yup"
import css from "./GoodForPurchase.module.css"
import { Routes } from "@/config/config"
import { BasketProduct, useBasketStore } from "@/lib/stores/basketStore"
import { Cloth } from "@/types/shop"

Yup.setLocale({
	number: {
		integer: "Число має бути цілим.",
		positive: "Число має бути позитивним.",
	},
	mixed: {
		required: "Це обов'язкове поле.",
	},
})

type FormValues = Omit<BasketProduct, "id">

interface Props {
	good: Cloth
}

export default function GoodForPurchase({ good }: Props) {
	const {
		image,
		category,
		name,
		price,
		stars,
		feedbacks,
		prevDescription,
		sizes,
		colors,
		description,
		characteristics,
		_id,
	} = good
	const amountOfFeedbacks: number = feedbacks.length
	const formId: string = useId()
	const router = useRouter()
	const basket = useBasketStore(state => state.basket)
	const setBasket = useBasketStore(state => state.setBasket)

	const validationSchema = Yup.object().shape({
		size: Yup.string().oneOf(sizes).required(),
		color: Yup.string().oneOf(colors).required(),
		amount: Yup.number().integer().positive().required(),
	})

	const initialValues: FormValues = {
		size: sizes[0],
		color: colors[0],
		amount: 1,
	}

	const checkStars = (checkOn: number): string =>
		stars >= checkOn ? "-filled" : stars === checkOn - 0.5 ? "-half" : ""

	const setBasketValues = (values: FormValues): void => {
		const newBasket = [...basket]
		let found = false

		newBasket.map((item, index) => {
			if (
				item.id === _id &&
				item.color === values.color &&
				item.size === values.size
			) {
				found = true
				const newAmount = item.amount + values.amount
				newBasket[index] = {
					...newBasket[index],
					amount: newAmount < 100 ? newAmount : 99,
				}
			}
		})

		if (!found) {
			newBasket.push({
				id: _id,
				...values,
				amount: values.amount < 100 ? values.amount : 99,
			})
		}

		setBasket(newBasket)
	}

	const handleBuy = async (values: FormValues): Promise<void> => {
		try {
			await validationSchema.validate(values)
			setBasketValues(values)
			router.push(Routes.Order)
		} catch (error) {
			toast.error(`${error}`)
		}
	}

	const handleSubmit = (values: FormValues): void => {
		setBasketValues(values)
		toast.success("Успішно додано до кошику!")
	}

	return (
		<div className={css.container}>
			<Image
				className={css.image}
				src={image}
				alt={name}
				width={335}
				height={357}
			/>
			<div>
				<div className={css.categorySection}>
					<Link href={Routes.Goods}>Всі товари</Link>
					<svg className={css.chevron} width={16} height={16}>
						<use href="/icons.svg#i-chevron"></use>
					</svg>
					<Link href={`${Routes.Goods}/category/${category._id}`}>
						{category.name}
					</Link>
					<svg className={css.chevron} width={16} height={16}>
						<use href="/icons.svg#i-chevron"></use>
					</svg>
					<p>{name}</p>
				</div>
				<h1 className={css.h1}>{name}</h1>
				<div className={css.priceAndRate}>
					<p className={css.price}>
						{price.value} {price.currency}
					</p>
					<div className={css.stars}>
						{[...Array(5)].map((x, i) => (
							<svg key={i} width={21} height={21}>
								<use href={`/icons.svg#i-star${checkStars(i + 1)}`}></use>
							</svg>
						))}
					</div>
					<p className={css.rate}>
						({stars}) • {amountOfFeedbacks}{" "}
						{`відгук${amountOfFeedbacks >= 5 ? "ів" : amountOfFeedbacks > 1 ? "и" : ""}`}
					</p>
				</div>
				<p className={css.prevDescription}>{prevDescription}</p>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}>
					{props => (
						<Form className={css.form}>
							<div className={css.fieldGroup}>
								<label htmlFor={`${formId}-size`}>Розмір</label>
								<Field as="select" id={`${formId}-size`} name="size">
									{sizes.map((size, i) => (
										<option key={i} value={size}>
											{size}
										</option>
									))}
								</Field>
								<ErrorMessage className={css.error} name="size" component="p" />
							</div>
							<div className={css.fieldGroup}>
								<p>Колір</p>
								<ul className={css.radioButtons}>
									{colors.map((color, i) => {
										let ukrColor:
											| "Білий"
											| "Чорний"
											| "Сірий"
											| "Синій"
											| "Зелений"
											| "Червоний"
											| "Пастельні відтінки"
										switch (color) {
											case "white":
												ukrColor = "Білий"
												break
											case "black":
												ukrColor = "Чорний"
												break
											case "grey":
												ukrColor = "Сірий"
												break
											case "blue":
												ukrColor = "Синій"
												break
											case "green":
												ukrColor = "Зелений"
												break
											case "red":
												ukrColor = "Червоний"
												break
											default:
												ukrColor = "Пастельні відтінки"
										}

										return (
											<li key={i}>
												<Field
													id={`${formId}-${color}`}
													type="radio"
													name="color"
													value={color}
												/>
												<label htmlFor={`${formId}-${color}`}>{ukrColor}</label>
											</li>
										)
									})}
								</ul>
								<ErrorMessage
									className={css.error}
									name="color"
									component="p"
								/>
							</div>
							<div className={css.groupedGroups}>
								<button className={css.submit} type="submit">
									Додати в кошик
								</button>
								<div className={css.fieldGroup}>
									<Field
										id={`${formId}-amount`}
										type="number"
										name="amount"
										placeholder="1"
										min={1}
									/>
									<ErrorMessage
										className={css.error}
										name="amount"
										component="p"
									/>
								</div>
							</div>
							<button
								className={css.buyButton}
								type="button"
								onClick={() => handleBuy(props.values)}>
								Купити зараз
							</button>
						</Form>
					)}
				</Formik>
				<p className={css.offer}>
					Безкоштовна доставка для замовлень від 1000 грн
				</p>
				<ul className={css.descriptionMenu}>
					{["Опис", "Доставка", "Поверення"].map((element, i) => (
						<li key={i}>
							<p>{element}</p>
						</li>
					))}
				</ul>
				<p className={css.description}>{description}</p>
				{characteristics.length && (
					<>
						<br />
						<p className={css.characteristicsTitle}>Основні характеристики</p>
						<ul className={css.characteristics}>
							{characteristics.map((characteristic, i) => (
								<li key={i}>
									<p>{characteristic}</p>
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		</div>
	)
}
