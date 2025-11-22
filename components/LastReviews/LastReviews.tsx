import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import { getFeedbacks } from "@/lib/api/clientApi"
import css from "./LastReviews.module.css"
import LastReviewsClient from "./LastReviews.client"
import { Cache } from "@/config/config"

export default async function LastReviews() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ["lastFeedbacks", { page: 1 }],
		queryFn: () => getFeedbacks({}),
		staleTime: Cache.Time,
	})

	return (
		<section className="section last-feedbacks" id="feedbacks">
			<div className={`container ${css.container}`}>
				<h2>Останні відгуки</h2>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<LastReviewsClient />
				</HydrationBoundary>
			</div>
		</section>
	)
}
