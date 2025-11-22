import Link from "next/link"
import css from "./Footer.module.css"
import { Routes, Socials } from "@/config/config"
import FooterSubscribe from "../FooterSubscribe/FooterSubscribe"

export default function Footer() {
	return (
		<footer className={css.footer}>
			<div className="container">
				<div className={css.top}>
					<Link
						href={Routes.Home}
						className={css.logo}
						aria-label="Clothica logo">
						<svg className="icon" width={84} height={36}>
							<use href="/icons.svg#i-logo"></use>
						</svg>
					</Link>
					<ul className={css.links}>
						<li>
							<h3>Меню</h3>
						</li>
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
					<div className={css.subscribe}>
						<h3>Підписатися</h3>
						<p>
							Приєднуйтесь до нашої розсилки, щоб бути в курсі новин та акцій.
						</p>
						<FooterSubscribe />
					</div>
				</div>
				<hr className={css.hr} />
				<div className={css.about}>
					<span>&copy; 2025 Clothica. Всі права захищені.</span>
					<ul className={css.socials}>
						<li>
							<a
								href={Socials.Facebook}
								target="_blank"
								aria-label="Clothica's facebook page">
								<svg className="icon" width={32} height={32}>
									<use href="/icons.svg#i-facebook"></use>
								</svg>
							</a>
						</li>
						<li>
							<a
								href={Socials.Instagram}
								target="_blank"
								aria-label="Clothica's instagram page">
								<svg className="icon" width={32} height={32}>
									<use href="/icons.svg#i-instagram"></use>
								</svg>
							</a>
						</li>
						<li>
							<a
								href={Socials.X}
								target="_blank"
								aria-label="Clothica's x page">
								<svg className="icon" width={32} height={32}>
									<use href="/icons.svg#i-x"></use>
								</svg>
							</a>
						</li>
						<li>
							<a
								href={Socials.Youtube}
								target="_blank"
								aria-label="Clothica's youtube page">
								<svg className="icon" width={32} height={32}>
									<use href="/icons.svg#i-youtube"></use>
								</svg>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
