"use client"

import { Category } from "@/types/shop"
import css from "./CategoriesFilter.module.css"
import { useEffect, useState } from "react"
import { FilterValues } from "@/app/(main)/(public routes)/goods/page"

interface Props {
	categories: Category[]
	filterColor: string
	filterCategory: string
	filterSizes: string[]
	filterGender: string
	priceFrom: number
	priceTo: number
	defaultFilterValues: FilterValues
	setFilter: (name: string, value: unknown) => void
	setPriceFrom: (value: number) => void
	setPriceTo: (value: number) => void
}

export default function CategoriesFilter({
	categories,
	filterCategory,
	filterGender,
	filterSizes,
	filterColor,
	priceFrom,
	priceTo,
	defaultFilterValues,
	setPriceFrom,
	setPriceTo,
	setFilter,
}: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [percent1, setPercent1] = useState<number>(0)
	const [percent2, setPercent2] = useState<number>(100)
	const colorsArray = [
		{ name: "білий", value: "white" },
		{ name: "чорний", value: "black" },
		{ name: "сірий", value: "grey" },
		{ name: "синій", value: "blue" },
		{ name: "зелений", value: "green" },
		{ name: "червоний", value: "red" },
		{ name: "пастельні відтінки", value: "pastel" },
	]
	const gendersArray = [
		{ name: "Всі", value: "all" },
		{ name: "Жіночий", value: "women" },
		{ name: "Чоловічий", value: "men" },
		{ name: "Унісекс", value: "unisex" },
	]
	const sizesArray = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]

	const slide = (e: React.FormEvent<HTMLInputElement>, slideNum: 0 | 1) => {
		const val = parseInt(e.currentTarget.value)

		let newValue1 = priceFrom
		let newValue2 = priceTo

		if (slideNum === 0) {
			newValue1 = Math.min(val, newValue2 - 1)
			setPriceFrom(newValue1)
		} else {
			newValue2 = Math.max(val, newValue1 + 1)
			setPriceTo(newValue2)
		}
	}

	const changeSlide = (
		e: React.ChangeEvent<HTMLInputElement>,
		slideNum: 0 | 1
	) => {
		if (slideNum === 0) setPriceFrom(parseInt(e.currentTarget.value))
		else setPriceTo(parseInt(e.currentTarget.value))
	}

	useEffect(() => {
		setPercent1((priceFrom / 20000) * 100)
	}, [priceFrom])

	useEffect(() => {
		setPercent2((priceTo / 20000) * 100)
	}, [priceTo])

	return (
		<>
			<div className={css.filters}>
				<p
					className={`${css.select} ${isOpen && css.selectActive}`}
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Open filters">
					Фільтри
					<svg className="icon" width={24} height={24}>
						<use href="/icons.svg#i-chevron"></use>
					</svg>
				</p>
				<div className={`${css.content} ${isOpen ? css.active : ""}`}>
					<ul className={css.categories}>
						{[{ name: "Усі", _id: "all", image: "" }]
							.concat(categories)
							.map(category => (
								<li key={category._id}>
									<button
										type="button"
										onClick={() =>
											setFilter("category", [category._id, category.name])
										}
										disabled={category._id === filterCategory}
										className={
											category._id === filterCategory ? css.filterActive : ""
										}>
										{category.name}
									</button>
								</li>
							))}
					</ul>
					<hr className={css.hr} />
					<ul className={css.sizes}>
						<li>
							<h3>
								Розмір
								<button
									type="button"
									onClick={() => setFilter("sizes", defaultFilterValues.sizes)}
									disabled={filterSizes === defaultFilterValues.sizes}>
									Очистити
								</button>
							</h3>
						</li>
						{sizesArray.map(size => (
							<li key={size}>
								<input
									type="checkbox"
									value={size}
									readOnly
									onClick={() => setFilter("sizes", size)}
									checked={filterSizes.includes(size)}
								/>
								<p>{size}</p>
							</li>
						))}
					</ul>
					<hr className={css.hr} />
					<ul className={css.price}>
						<li>
							<h3>
								Ціна
								<button
									type="button"
									onClick={() => {
										setPriceFrom(defaultFilterValues.priceFrom)
										setPriceTo(defaultFilterValues.priceTo)
									}}>
									Очистити
								</button>
							</h3>
						</li>
						<li>
							<div className={css.sliders}>
								<div
									className={css.sliderTrack}
									style={
										{
											"--percent1": `${percent1}%`,
											"--percent2": `${percent2}%`,
										} as React.CSSProperties
									}></div>
								<input
									className={css.fromSlider}
									type="range"
									value={priceFrom}
									min="0"
									max="19999"
									onInput={e => slide(e, 0)}
								/>
								<input
									className={css.toSlider}
									type="range"
									value={priceTo}
									min="1"
									max="20000"
									onInput={e => slide(e, 1)}
								/>
							</div>
							<div className={css.controls}>
								<input
									type="number"
									value={priceFrom}
									onChange={e => changeSlide(e, 0)}
									min="0"
									max="19999"
								/>
								<input
									type="number"
									value={priceTo}
									onChange={e => changeSlide(e, 1)}
									min="1"
									max="20000"
								/>
							</div>
						</li>
					</ul>
					<hr className={css.hr} />
					<ul className={css.colors}>
						<li>
							<h3>
								Колір
								<button
									type="button"
									onClick={() => setFilter("color", defaultFilterValues.color)}
									disabled={filterColor === defaultFilterValues.color}>
									Очистити
								</button>
							</h3>
						</li>
						<li>
							{colorsArray.map(color => (
								<button
									key={color.name}
									type="button"
									onClick={() => setFilter("color", color.value)}
									disabled={color.value === filterColor}
									className={
										color.value === filterColor ? css.filterActive : ""
									}>
									{color.name}
								</button>
							))}
						</li>
					</ul>
					<hr className={css.hr} />
					<ul className={css.gender}>
						<li>
							<h3>
								Стать
								<button type="button">Очистити</button>
							</h3>
						</li>
						{gendersArray.map(gender => (
							<li key={gender.name}>
								<input
									type="radio"
									value={gender.value}
									readOnly
									onClick={() => setFilter("gender", gender.value)}
									checked={gender.value === filterGender}
									disabled={gender.value === filterGender}
								/>
								<p>{gender.name}</p>
							</li>
						))}
					</ul>
					<hr className={css.hr} />
				</div>
			</div>
		</>
	)
}
