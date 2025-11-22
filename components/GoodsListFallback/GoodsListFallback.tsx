import Image from "next/image"
import css from "../GoodsList/GoodsList.module.css"
import css2 from "./GoodsListFallback.module.css"
import loadingCSS from "../CategoriesListFallback/CategoriesListFallback.module.css"

export default function GoodsListFallback({
	length,
}: Readonly<{ length: number }>) {
	return (
		<ul className={`${css.swiper} ${css2.swiper}`}>
			{Array.from({ length }).map((_, i) => (
				<li key={i} className={css.slide}>
					<Image
						src={
							"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
						}
						sizes="(max-width: 768px) 335px, (max-width: 1439px) 336px, (min-width: 1440px) 304px"
						width={335}
						height={412}
						className={loadingCSS.loading}
						alt={`Loading ${i}`}
					/>
					<h3 className={loadingCSS.loading}>?????</h3>
					<p className={loadingCSS.loading}>?????</p>
				</li>
			))}
		</ul>
	)
}
