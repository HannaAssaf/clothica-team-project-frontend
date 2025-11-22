import Image from "next/image"
import css from "./Hero.module.css"

export default function Hero() {
	return (
		<section className="section hero">
			<div className="container">
				<ul className={css.info}>
					<li>
						<h1>Знайди свій стиль з Clothica вже сьогодні!</h1>
						<p>
							Clothica — це місце, де комфорт поєднується зі стилем. Ми
							створюємо базовий одяг, який легко комбінується та підходить для
							будь-якої нагоди. Обирай речі, що підкреслять твою
							індивідуальність i завжди будуть актуальними.
						</p>
						<a href="#goods" className={`${css.button} ${css.goodsButton}`}>
							До товарів
						</a>
						<a
							href="#categories"
							className={`${css.button} ${css.categoriesButton}`}>
							Дослідити категорії
						</a>
					</li>
					<li>
						<Image
							src="/images/hero.png"
							width={335}
							height={335}
							sizes="(max-width: 768px) 335px, (max-width: 1439px) 336px, (min-width: 1440px) 640px"
							alt="Hero Cover"
						/>
					</li>
				</ul>
			</div>
		</section>
	)
}
