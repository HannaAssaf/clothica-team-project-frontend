import { Routes } from "@/config/config"
import Link from "next/link"
import css from "./AuthNavigation.module.css"

export default function AuthNavigation({ route }: { route: string }) {
	return (
		<div
			className={css.links}
			role="navigation"
			aria-label="Navigate between login and register">
			<Link
				href={Routes.Register}
				className={`${css.link} ${route === Routes.Register ? css.active : ""}`}>
				Реєстрація
			</Link>
			<Link
				href={Routes.Login}
				className={`${css.link} ${route === Routes.Login ? css.active : ""}`}>
				Вхід
			</Link>
		</div>
	)
}
