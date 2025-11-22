import Image from "next/image"
import css from "./CategoriesListFallback.module.css"

export default function CategoriesListFallback({
	length,
}: Readonly<{ length: number }>) {
	return (
		<ul className={css.list}>
			{Array.from({ length }).map((_, i) => (
				<li key={i}>
					<Image
						src={
							"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
						}
						sizes="(max-width: 768px) 335px, (max-width: 1439px) 336px, (min-width: 1440px) 416px"
						width={335}
						height={223}
						className={css.loading}
						alt={`Loading ${i}`}
					/>
					<h3 className={css.loading}>??????</h3>
				</li>
			))}
		</ul>
	)
}
