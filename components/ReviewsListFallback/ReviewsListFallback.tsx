import loadingCSS from "../CategoriesListFallback/CategoriesListFallback.module.css"

export default function ReviewsListFallback({
	length,
}: Readonly<{ length: number }>) {
	return (
		<ul className={loadingCSS.list}>
			{Array.from({ length }).map((_, i) => (
				<li key={i}>
					<span className={`rating ${loadingCSS.loading}`}></span>
					<p className={loadingCSS.loading}>
						?????????????????????????????????????????????????
					</p>
					<h3 className={loadingCSS.loading}>???</h3>
				</li>
			))}
		</ul>
	)
}
