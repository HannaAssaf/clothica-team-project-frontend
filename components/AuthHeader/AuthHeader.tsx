import { Routes } from "@/config/config"
import Link from "next/link"
import css from "./AuthHeader.module.css"

export default function AuthHeader() {
	return (
		<header className={css.header}>
			<div className="container">
				<Link
					href={Routes.Home}
					className={css.logo}
					aria-label="Clothica logo">
					<svg className="icon" width={84} height={36}>
						<use href="/icons.svg#i-logo"></use>
					</svg>
				</Link>
			</div>
		</header>
	)
}
