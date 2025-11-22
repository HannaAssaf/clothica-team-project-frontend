"use client"

import { useEffect, useId, useState } from "react"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import { createOrder, createOrderUser, OrderData } from "@/lib/api/clientApi"
import { OrderUserData } from "@/types/shop"
import { useAuthStore } from "@/lib/stores/authStore"
import toast from "react-hot-toast"
import css from "./CreateOrderForm.module.css"
import { useBasketStore } from "@/lib/stores/basketStore"
import { redirect, RedirectType } from "next/navigation"
import { Routes } from "@/config/config"

type CreateOrderData = OrderUserData & { comment: string }

Yup.setLocale({
	string: {
		min: "Мінімум ${min} символ(а/ів).",
		max: "Максимум ${max} символ(а/ів).",
	},
	mixed: {
		required: "Це обов'язкове поле.",
	},
})

const validationSchema = Yup.object().shape({
	firstName: Yup.string().trim().min(2).max(32).required(),
	lastName: Yup.string().trim().min(2).max(32).required(),
	phone: Yup.string()
		.trim()
		.max(19)
		.matches(
			/\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/,
			"Номер телефону не валідний формату «+38 (0__) ___-__-__»."
		)
		.required(),
	city: Yup.string().trim().required(),
	comment: Yup.string().trim().max(250),
	postalOffice: Yup.number()
		.min(1, "Мінімум одна не негативна цифра та не нуль.")
		.required(),
})

const getPhone = (phone: string) => {
	const phoneMatch = phone.match(/\+38(0\d{2})(\d{3})(\d{2})(\d{2})/)
	const regPhone = phoneMatch
		? `+38 (${phoneMatch[1]}) ${phoneMatch[2]}-${phoneMatch[3]}-${phoneMatch[4]}`
		: ""
	return regPhone
}

export default function CreateOrderForm() {
	const formId = useId()
	const user = useAuthStore(state => state.user)
	const basket = useBasketStore(state => state.basket)
	const clearBasket = useBasketStore(state => state.clearBasket)
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const regPhone = getPhone(user?.phone ?? "")

	useEffect(() => {
		const loaded = () => {
			setIsLoaded(true)
		}

		loaded()
	}, [basket])

	if (isLoaded && basket.length === 0) {
		redirect(Routes.Profile, RedirectType.push)
	}

	const initialValues: CreateOrderData = {
		firstName: user?.firstName ?? "",
		lastName: user?.lastName ?? "",
		phone: regPhone,
		city: user?.city ?? "",
		comment: "",
		postalOffice: user?.postalOffice ?? 1,
	}

	const formatPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		const digits = value.replace(/\D/g, "")
		const match = digits.match(/(\d{0,2}0)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)

		let newValue = "+38 (0"

		if (!match) {
			e.currentTarget.value = newValue
			return
		}

		if (match[2]) newValue += `${match[2]}`
		if (match[3]) newValue += `) ${match[3]}`
		if (match[4]) newValue += `-${match[4]}`
		if (match[5]) newValue += `-${match[5]}`

		e.currentTarget.value = newValue
	}

	const handleSubmit = async (
		values: CreateOrderData,
		actions: FormikHelpers<CreateOrderData>
	): Promise<void> => {
		values.phone = values.phone
			.replace(" (", "")
			.replace(") ", "")
			.replace(/-/g, "")

		actions.resetForm()

		const orderData: OrderData = {
			products: basket,
			comment: values.comment,
			userData: {
				firstName: values.firstName,
				lastName: values.lastName,
				phone: values.phone,
				city: values.city,
				postalOffice: values.postalOffice,
			},
		}

		try {
			if (user) {
				await createOrderUser(orderData)
			} else {
				await createOrder(orderData)
			}
		} catch {
			toast.error("Error while creating order")
			return
		}

		toast.success("Order was successfully created")
		clearBasket()
	}

	return (
		isLoaded && (
			<Formik
				enableReinitialize
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}>
				<Form className={css.form}>
					<div className={css.groupedGroups}>
						<div className={css.fieldGroup}>
							<label htmlFor={`${formId}-firstName`}>Імʼя*</label>
							<Field
								className={css.field}
								id={`${formId}-firstName`}
								type="text"
								name="firstName"
								placeholder="Ваше імʼя"
								minLength="2"
								maxLength="32"
							/>
							<ErrorMessage
								className={css.error}
								name="firstName"
								component="p"
							/>
						</div>
						<div className={css.fieldGroup}>
							<label htmlFor={`${formId}-lastName`}>Прізвище*</label>
							<Field
								className={css.field}
								id={`${formId}-lastName`}
								type="text"
								name="lastName"
								placeholder="Ваше прізвище"
								minLength="2"
								maxLength="32"
							/>
							<ErrorMessage
								className={css.error}
								name="lastName"
								component="p"
							/>
						</div>
					</div>

					<div className={css.fieldGroup}>
						<label htmlFor={`${formId}-phone`}>Номер телефону*</label>
						<Field
							className={css.field}
							id={`${formId}-phone`}
							type="text"
							name="phone"
							placeholder="+38 (0__) ___-__-__"
							onInput={formatPhone}
						/>
						<ErrorMessage className={css.error} name="phone" component="p" />
					</div>

					<div className={css.groupedGroups}>
						<div className={css.fieldGroup}>
							<label htmlFor={`${formId}-city`}>Місто доставки*</label>
							<Field
								className={css.field}
								id={`${formId}-city`}
								type="text"
								name="city"
								placeholder="Ваше місто"
							/>
							<ErrorMessage className={css.error} name="city" component="p" />
						</div>
						<div className={css.fieldGroup}>
							<label htmlFor={`${formId}-postalOffice`}>
								Номер відділення Нової Пошти*
							</label>
							<Field
								className={css.field}
								id={`${formId}-postalOffice`}
								type="number"
								name="postalOffice"
								placeholder="1"
								min="1"
							/>
							<ErrorMessage
								className={css.error}
								name="postalOffice"
								component="p"
							/>
						</div>
					</div>

					<div className={css.fieldGroup}>
						<label htmlFor={`${formId}-comment`}>Коментар</label>
						<Field
							as="textarea"
							className={`${css.field} ${css.textarea}`}
							id={`${formId}-comment`}
							name="comment"
							placeholder="Введіть ваш коментар"
						/>
						<ErrorMessage className={css.error} name="comment" component="p" />
					</div>

					<button className={css.button} type="submit">
						Оформити замовлення
					</button>
				</Form>
			</Formik>
		)
	)
}
