import { Routes } from "@/config/config"
import Link from "next/link"
import css from "../BasketButton/BasketButton.module.css"

export default function BasketButtonFallback() {
	return (
		<Link href={Routes.Basket} className={css.cart} aria-label="Open cart menu">
			<svg className="icon" width={24} height={24}>
				<use href="/icons.svg#i-cart"></use>
			</svg>
			<span>0</span>
		</Link>
	)
}
