"use client"

import CategoriesList from "@/components/CategoriesList/CategoriesList"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/lib/api/clientApi"
import { useEffect, useState } from "react"
import { Category } from "@/types/shop"
import { useMediaQuery } from "react-responsive"
import css from "./CategoriesPage.module.css"
import CategoriesListFallback from "@/components/CategoriesListFallback/CategoriesListFallback"
import { Cache } from "@/config/config"

export default function CategoriesPage() {
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isNewPortion, setIsNewPortion] = useState<boolean>(true)
	const [categories, setCategories] = useState<Category[]>([])
	const perPage = useMediaQuery({ query: "(min-width: 1440px)" }) ? 6 : 4

	const { data } = useQuery({
		queryKey: ["categories", { page }],
		queryFn: () => getCategories({ page, perPage }),
		staleTime: Cache.Time,
		refetchOnMount: false,
		enabled: isNewPortion,
	})

	useEffect(() => {
		const setNewCategories = () => {
			if (data && isNewPortion) {
				setTotalPages(data.totalPages)
				setIsNewPortion(false)
				if (page === 1) {
					setCategories(data.categories)
				} else {
					setCategories(previous => [...previous, ...data.categories])
				}
			}
		}
		setNewCategories()
	}, [isNewPortion, data, page])

	const loadMore = () => {
		if (totalPages <= page) return

		setPage(page + 1)
		setIsNewPortion(true)
	}

	if (isNewPortion && page == 1) {
		return (
			<section className="section categories">
				<div className="container">
					<h2>Категорії</h2>
					<CategoriesListFallback length={6} />
				</div>
			</section>
		)
	}

	return (
		<section className="section categories">
			<div className="container">
				<h2>Категорії</h2>
				{categories && (
					<CategoriesList swiperClass={css.list} categories={categories} />
				)}
				{page < totalPages && (
					<button type="button" className={css.button} onClick={loadMore}>
						Показати більше
					</button>
				)}
			</div>
		</section>
	)
}
