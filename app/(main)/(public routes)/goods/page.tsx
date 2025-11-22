"use client"

import CategoriesFilter from "@/components/CategoriesFilter/CategoriesFilter"
import GoodsList from "@/components/GoodsList/GoodsList"
import { Cache } from "@/config/config"
import { getCategories, getGoods } from "@/lib/api/clientApi"
import { Category, Cloth, Color } from "@/types/shop"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import MessageNoInfo from "@/components/MessageNoInfo/MessageNoInfo"
import css from "./GoodsPage.module.css"
import { useDebounce } from "use-debounce"
import CategoriesListFallback from "@/components/CategoriesListFallback/CategoriesListFallback"

export interface FilterValues {
	color: Color | string
	category: Category["_id"] | "all"
	gender: string
	sizes: string[]
	priceFrom: number
	priceTo: number
}

interface Props {
	category?: string
}

export default function GoodsPage({ category }: Props) {
	const defaultFilterValues: FilterValues = {
		color: "",
		sizes: [],
		gender: "all",
		category: "all",
		priceFrom: 0,
		priceTo: 20000,
	}
	const [goods, setGoods] = useState<Cloth[]>([])
	const [page, setPage] = useState<number>(1)
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [priceFrom, setPriceFrom] = useState<number>(
		defaultFilterValues.priceFrom
	)
	const [priceFromDebounce] = useDebounce(priceFrom, 300)
	const [priceTo, setPriceTo] = useState<number>(defaultFilterValues.priceTo)
	const [priceToDebounce] = useDebounce(priceTo, 300)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [totalGoods, setTotalGoods] = useState<number>(0)
	const [isNewPortion, setIsNewPortion] = useState<boolean>(true)
	const [filterCategory, setFilterCategory] = useState<Category["_id"] | "all">(
		category ?? defaultFilterValues.category
	)
	const [currentCategory, setCurrentCategory] = useState<string>(
		defaultFilterValues.category
	)
	const [filterSizes, setFilterSizes] = useState<string[]>(
		defaultFilterValues.sizes
	)
	const [filterGender, setFilterGender] = useState<string>(
		defaultFilterValues.gender
	)
	const [filterColor, setFilterColor] = useState<Color | string>(
		defaultFilterValues.color
	)
	const perPage = useMediaQuery({ query: "(min-width: 1440px)" }) ? 12 : 8

	const { data: categoriesData } = useQuery({
		queryKey: ["categories"],
		queryFn: () => getCategories({ perPage: 12 }),
		staleTime: Cache.Time,
	})

	const { data: goodsData } = useQuery({
		queryKey: [
			"goods",
			{
				page,
				category: filterCategory,
				sizes: filterSizes,
				price: [priceFromDebounce, priceToDebounce],
				color: filterColor,
				gender: filterGender,
			},
		],
		queryFn: () =>
			getGoods({
				page,
				perPage,
				color: filterColor !== "" ? filterColor : undefined,
				gender: filterGender !== "all" ? filterGender : undefined,
				category: filterCategory !== "all" ? filterCategory : undefined,
				sizes: filterSizes.length !== 0 ? filterSizes.join(",") : undefined,
				price: `${priceFromDebounce},${priceToDebounce}`,
				sort: "desc",
			}),
		staleTime: Cache.Time,
		enabled: isNewPortion,
	})

	useEffect(() => {
		const update = () => {
			setPage(1)
			setTotalPages(1)
			setIsNewPortion(true)
		}

		update()
	}, [
		priceFromDebounce,
		priceToDebounce,
		filterColor,
		filterGender,
		filterSizes,
		filterCategory,
	])

	useEffect(() => {
		const load = () => {
			if (goodsData && isNewPortion) {
				if (page === 1) {
					setGoods(goodsData.goods)
					setTotalPages(goodsData.totalPages)
					setTotalGoods(goodsData.totalGoods)
					if (filterCategory != "all")
						setCurrentCategory(goodsData.goods?.[0]?.category?.name ?? "all")
					if (goodsData.goods?.[0]?.category?.name === "Усі")
						setCurrentCategory("all")
				} else {
					setGoods(prev => [...prev, ...goodsData.goods])
				}
				setIsNewPortion(false)
			}
		}

		load()
	}, [page, isNewPortion, goodsData, filterCategory])

	useEffect(() => {
		const loaded = () => setIsLoaded(true)
		loaded()
	}, [])

	const loadMore = () => {
		if (totalPages <= page) return
		setPage(page + 1)
		setIsNewPortion(true)
	}

	const checkIfAllDefault = () => {
		return (
			filterCategory === defaultFilterValues.category &&
			priceFrom === defaultFilterValues.priceFrom &&
			priceTo === defaultFilterValues.priceTo &&
			filterColor === defaultFilterValues.color &&
			filterGender === defaultFilterValues.gender &&
			filterSizes === defaultFilterValues.sizes
		)
	}

	const clearFilters = () => {
		if (checkIfAllDefault()) return
		setPage(1)
		setTotalPages(1)
		setGoods([])
		setCurrentCategory(defaultFilterValues.category)
		setFilterCategory(defaultFilterValues.category)
		setPriceFrom(defaultFilterValues.priceFrom)
		setPriceTo(defaultFilterValues.priceTo)
		setFilterColor(defaultFilterValues.color)
		setFilterGender(defaultFilterValues.gender)
		setFilterSizes(defaultFilterValues.sizes)
	}

	const setFilter = (name: string, value: unknown) => {
		setPage(1)
		setTotalPages(1)
		setGoods([])
		if (name === "category" && Array.isArray(value)) {
			setFilterCategory(value[0])
			if (value[1] === "Усі") setCurrentCategory(defaultFilterValues.category)
			else setCurrentCategory(value[1])
		}
		if (name === "color" && typeof value === "string") {
			setFilterColor(value)
		}
		if (name === "gender" && typeof value === "string") {
			setFilterGender(value)
		}
		if (name === "sizes" && typeof value === "string") {
			if (filterSizes.length === 0) {
				if (filterSizes.includes(value)) {
					setFilterSizes(defaultFilterValues.sizes)
				} else {
					setFilterSizes([value])
				}
			} else {
				if (filterSizes.includes(value)) {
					setFilterSizes(prev => prev.filter(size => size !== value))
				} else {
					setFilterSizes(prev => [...prev, value])
				}
			}
		}
		if (name === "sizes" && typeof value === "object") {
			setFilterSizes(defaultFilterValues.sizes)
		}
	}

	if (!isLoaded) {
		return (
			<section className={`section ${css.goods}`}>
				<div className="container">
					<h1 className={css.h1}>Всі товари</h1>
					<div className={css.blocks}>
						<div className={css.filtersBlock}>
							<h2>
								Фільтри
								<button
									type="button"
									className={css.clear}
									onClick={clearFilters}>
									Очистити всі
								</button>
							</h2>
							<span className={css.count}>
								Показано {goods.length} з {totalGoods}
							</span>
							<div className={css.filters}>
								<p className={css.select} aria-label="Open filters">
									Фільтри
									<svg className="icon" width={24} height={24}>
										<use href="/icons.svg#i-chevron"></use>
									</svg>
								</p>
							</div>
						</div>
						<div className={css.goodsBlock}>
							<CategoriesListFallback length={12} />
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className={`section ${css.goods}`}>
			<div className="container">
				<h1 className={css.h1}>
					{currentCategory === "all" ? "Всі товари" : currentCategory}
				</h1>
				<div className={css.blocks}>
					<div className={css.filtersBlock}>
						<h2>
							Фільтри
							<button
								type="button"
								className={css.clear}
								onClick={clearFilters}>
								Очистити всі
							</button>
						</h2>
						<span className={css.count}>
							Показано {goods.length} з {totalGoods}
						</span>
						{categoriesData && (
							<CategoriesFilter
								defaultFilterValues={defaultFilterValues}
								filterColor={filterColor}
								filterSizes={filterSizes}
								filterGender={filterGender}
								filterCategory={filterCategory}
								setFilter={setFilter}
								priceFrom={priceFrom}
								priceTo={priceTo}
								setPriceFrom={setPriceFrom}
								setPriceTo={setPriceTo}
								categories={categoriesData.categories}
							/>
						)}
					</div>
					<div className={css.goodsBlock}>
						{goods && totalGoods ? (
							<GoodsList
								sizes={
									"(max-width: 768px) 335px, (max-width: 1439px) 198px, (min-width: 1440px) 304px"
								}
								goods={goods}
								paginationClass={css.list}
							/>
						) : (
							isLoaded && (
								<MessageNoInfo
									text="За вашим запитом не знайдено жодних товарів, спробуйте змінити фільтри, або скинути їх"
									buttonText="Скинути фільтри"
										onClick={clearFilters}
										globalClass="messageNoInfoGoodsPage"
								/>
							)
						)}
						{page < totalPages && (
							<button type="button" className={css.button} onClick={loadMore}>
								Показати більше
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
