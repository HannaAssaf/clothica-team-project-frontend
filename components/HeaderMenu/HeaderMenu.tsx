"use client"

import { Suspense, useState } from "react"
import { createPortal } from "react-dom"
import css from "./HeaderMenu.module.css"
import Link from "next/link"
import { Routes } from "@/config/config"
import BasketButton from "../BasketButton/BasketButton"
import RunOnlyClient from "../RunOnlyClient/RunOnlyClient"
import { useAuthStore } from "@/lib/stores/authStore"

interface Props {
	menuClass: string
}

export default function HeaderMenu({ menuClass }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)

	const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		document.body.style.overflow = "hidden"
		setIsOpen(true)
	}

	const close = () => {
		document.body.style.overflow = ""
		setIsOpen(false)
	}

	return (
		<RunOnlyClient>
			<a
				href="#"
				onClick={open}
				className={menuClass}
				aria-label="Open mobile navigation">
				<svg className="icon" width={24} height={24}>
					<use href="/icons.svg#i-menu"></use>
				</svg>
			</a>
			{isOpen &&
				createPortal(
					<div className={css.backdrop} role="dialog" aria-modal="true">
						<div className={css.menu}>
							<ul className={css.nav}>
								<li>
									<Link href={Routes.Home} className={css.logo}>
										<svg className="icon" width={84} height={36}>
											<use href="/icons.svg#i-logo"></use>
										</svg>
									</Link>
								</li>
								<li>
									<button
										type="button"
										className={css.closeButton}
										onClick={close}>
										<svg className="icon" width={24} height={24}>
											<use href="/icons.svg#i-cross"></use>
										</svg>
									</button>
									<BasketButton onClick={close} />
								</li>
							</ul>
							<ul className={css.links}>
								<li>
									<Link href={Routes.Home} onClick={close}>
										Головна
									</Link>
								</li>
								<li>
									<Link href={Routes.Goods} onClick={close}>
										Товари
									</Link>
								</li>
								<li>
									<Link href={Routes.Categories} onClick={close}>
										Категорії
									</Link>
								</li>
								{isAuthenticated ? (
									<li>
										<Link
											href={Routes.Profile}
											className={`${css.profile} ${css.button}`}
											onClick={close}>
											Кабінет
										</Link>
									</li>
								) : (
									<>
										<li>
											<Link
												href={Routes.Login}
												className={`${css.login} ${css.button}`}
												onClick={close}>
												Вхід
											</Link>
										</li>
										<li>
											<Link
												href={Routes.Register}
												className={`${css.register} ${css.button}`}
												onClick={close}>
												Реєстрація
											</Link>
										</li>
									</>
								)}
							</ul>
						</div>
					</div>,
					document.body
				)}
		</RunOnlyClient>
	)
}
