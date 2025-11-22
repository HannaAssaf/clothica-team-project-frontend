import { Routes } from "@/config/config"
import Link from "next/link"
import css from "../PopularCategories/PopularCategories.module.css"
import CategoriesListFallback from "../CategoriesListFallback/CategoriesListFallback"

export default function PopularCategoriesFallback() {
	return (
		<section className={`section ${css.popularCategories}`} id="categories">
			<div className={`container ${css.container}`}>
				<ul className={css.info}>
					<li>
						<h2>Популярні категорії</h2>
					</li>
					<li>
						<Link href={Routes.Categories} className={css.button}>
							Всі категорії
						</Link>
					</li>
				</ul>
				<CategoriesListFallback length={3} />
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
		</section>
	)
}
