import Link from "next/link"
import css from "./Header.module.css"
import { Routes } from "@/config/config"
import BasketButton from "../BasketButton/BasketButton"
import HeaderMenu from "../HeaderMenu/HeaderMenu"
import HeaderAuth from "../HeaderAuth/HeaderAuth"

export default function Header() {
	return (
		<header className={css.header}>
			<div className="container">
				<nav className={css.nav}>
					<Link href={Routes.Home} className={css.logo} aria-label="Clothica logo">
						<svg className="icon" width={84} height={36}>
							<use href="/icons.svg#i-logo"></use>
						</svg>
					</Link>
					<ul className={css.links}>
						<li>
							<Link href={Routes.Home}>Головна</Link>
						</li>
						<li>
							<Link href={Routes.Goods}>Товари</Link>
						</li>
						<li>
							<Link href={Routes.Categories}>Категорії</Link>
						</li>
					</ul>
					<div className={css.user}>
						<HeaderMenu menuClass={css.menu} />
						<HeaderAuth />
						<BasketButton />
					</div>
				</nav>
			</div>
		</header>
	)
}
