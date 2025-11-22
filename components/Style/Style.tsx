import Image from "next/image"
import css from "./Style.module.css"

export default function Style() {
	return (
		<section className={`section ${css.style}`}>
			<div className="container">
				<h2>Обери свій унікальний стиль сьогодні</h2>
				<ul className={css.styles}>
					<li>
						<Image
							src="/images/strings.png"
							width={56}
							height={56}
							alt="Style image"
						/>
						<h3>Якість та натуральність</h3>
						<p>
							тільки приємні до тіла тканини, які зберігають форму навіть після
							десятків прань.
						</p>
					</li>
					<li>
						<Image
							src="/images/paint.png"
							width={56}
							height={56}
							alt="Style image"
						/>
						<h3>Універсальний дизайн</h3>
						<p>
							базові кольори та лаконічний стиль, що легко комбінуються між
							собою.
						</p>
					</li>
					<li>
						<Image
							src="/images/shirt.png"
							width={56}
							height={56}
							alt="Style image"
						/>
						<h3>Комфорт на кожен день</h3>
						<p>
							одяг, який не обмежує рухів i підходить для будь-якої ситуації.
						</p>
					</li>
				</ul>
			</div>
		</section>
	)
}
