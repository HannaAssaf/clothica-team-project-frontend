import { Routes } from "@/config/config"
import Link from "next/link"
import GoodsListFallback from "../GoodsListFallback/GoodsListFallback"
import css from "../PopularGoods/PopularGoods.module.css"

export default function PopularGoodsFallback() {
	return (
		<section className={`section ${css.popularGoods}`} id="goods">
			<div className={`container ${css.container}`}>
				<ul className={css.info}>
					<li>
						<h2>Популярні товари</h2>
					</li>
					<li>
						<Link href={Routes.Goods} className={css.button}>
							Всі товари
						</Link>
					</li>
				</ul>
				<GoodsListFallback length={3} />
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
								aria-label="Navigate next slide">
								<svg className="icon" width={24} height={24}>
									<use href="/icons.svg#i-arrow"></use>
								</svg>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
