"use client"

import { getGoods } from "@/lib/api/clientApi"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Cloth } from "@/types/shop"
import css from "./PopularGoods.module.css"
import GoodsList from "../GoodsList/GoodsList"
import { Cache } from "@/config/config"

export default function PopularGoodsClient() {
	const [page, setPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [goods, setGoods] = useState<Cloth[]>([])
	const [isNewPortion, setIsNewPortion] = useState<boolean>(true)

	const { data } = useQuery({
		queryKey: ["popularGoods", { page }],
		queryFn: () => getGoods({ page, sort: "desc" }),
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
					setGoods(data.goods)
				} else {
					setGoods(previous => [...previous, ...data.goods])
				}
			}
		}
		setNewCategories()
	}, [isNewPortion, data, page])

	const loadMore = () => {
		if (totalPages <= page) {
			return
		}

		setPage(page + 1)
		setIsNewPortion(true)
	}

	return (
		goods && (
			<>
				<GoodsList
					isSwiper={true}
					goods={goods}
					paginationClass={css.pagination}
					leftBtnClass={css.leftBtn}
					rightBtnClass={css.rightBtn}
				/>
				<div className={css.navigation}>
					<ul className={css.pagination}></ul>
					<ul className={css.navBtns}>
						<li>
							<button
								type="button"
								className={`${css.navBtn} ${css.leftBtn}`}
								aria-label="Navigate previous slide">
								<svg className="icon" width={24} height={24}>
									<use href="/icons.svg#i-arrow"></use>
								</svg>
							</button>
						</li>
						<li>
							<button
								type="button"
								className={`${css.navBtn} ${css.rightBtn}`}
								onClick={loadMore}
								aria-label="Navigate next slide">
								<svg className="icon" width={24} height={24}>
									<use href="/icons.svg#i-arrow"></use>
								</svg>
							</button>
						</li>
					</ul>
				</div>
			</>
		)
	)
}
