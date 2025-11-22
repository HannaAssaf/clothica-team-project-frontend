import ReviewsListFallback from "../ReviewsListFallback/ReviewsListFallback"
import css from "../LastReviews/LastReviews.module.css"

export default async function ReviewsFallback() {
	return (
		<section className="section last-feedbacks" id="feedbacks">
			<div className={`container ${css.container}`}>
				<h2>Останні відгуки</h2>
				<ReviewsListFallback length={3} />
				<ul className={css.navBtns}>
					<li>
						<button
							type="button"
							className={`${css.navBtn} ${css.leftBtn}`}
							aria-label="Navigate previous slide">
							<svg className="icon" width={24} height={24}>
								<use href="/icons.svg#i-arrow"></use>
							</svg>
						</button>
					</li>
					<li>
						<button
							type="button"
							className={`${css.navBtn} ${css.rightBtn}`}
							aria-label="Navigate next slide">
							<svg className="icon" width={24} height={24}>
								<use href="/icons.svg#i-arrow"></use>
							</svg>
						</button>
					</li>
				</ul>
			</div>
		</section>
	)
}
