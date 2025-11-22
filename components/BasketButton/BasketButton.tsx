"use client"

import { Routes } from "@/config/config"
import Link from "next/link"
import { useBasketStore } from "@/lib/stores/basketStore"
import css from "./BasketButton.module.css"
import RunOnlyClient from "../RunOnlyClient/RunOnlyClient"
import BasketButtonFallback from "../BasketButtonFallback/BasketButtonFallback"

interface Props {
	onClick?: () => void
}

export default function BasketButton({ onClick }: Props) {
	const basket = useBasketStore(state => state.basket)

	return (
		<RunOnlyClient fallback={<BasketButtonFallback />}>
			<Link
				href={Routes.Basket}
				onClick={onClick}
				className={css.cart}
				aria-label="Open cart menu">
				<svg className="icon" width={24} height={24}>
					<use href="/icons.svg#i-cart"></use>
				</svg>
				<span>{basket.length}</span>
			</Link>
		</RunOnlyClient>
	)
}
