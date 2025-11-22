"use client"

import { Routes } from "@/config/config"
import Link from "next/link"
import css from "./HeaderAuth.module.css"
import { useAuthStore } from "@/lib/stores/authStore"

export default function HeaderAuth() {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)

	return isAuthenticated ? (
		<Link href={Routes.Profile} className={`${css.button} ${css.profile}`}>
			Кабінет
		</Link>
	) : (
		<>
			<Link href={Routes.Login} className={`${css.button} ${css.login}`}>
				Вхід
			</Link>
			<Link href={Routes.Register} className={`${css.button} ${css.register}`}>
				Реєстрація
			</Link>
		</>
	)
}
