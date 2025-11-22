import Hero from "@/components/Hero/Hero"
import LastReviews from "@/components/LastReviews/LastReviews"
import PopularCategories from "@/components/PopularCategories/PopularCategories"
import PopularCategoriesFallback from "@/components/PopularCategoriesFallback/PopularCategoriesFallback"
import PopularGoods from "@/components/PopularGoods/PopularGoods"
import PopularGoodsFallback from "@/components/PopularGoodsFallback/PopularGoodsFallback"
import ReviewsFallback from "@/components/ReviewsFallback/ReviewsFallback"
import Style from "@/components/Style/Style"
import { Suspense } from "react"

export default function HomePage() {
	return (
		<>
			<Hero />
			<Style />
			<Suspense fallback={<PopularCategoriesFallback />}>
				<PopularCategories />
			</Suspense>
			<Suspense fallback={<PopularGoodsFallback />}>
				<PopularGoods />
			</Suspense>
			<Suspense fallback={<ReviewsFallback />}>
				<LastReviews />
			</Suspense>
		</>
	)
}
