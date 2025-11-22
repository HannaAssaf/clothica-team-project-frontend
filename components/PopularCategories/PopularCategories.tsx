import css from "./PopularCategories.module.css"
import Link from "next/link"
import { Cache, Routes } from "@/config/config"
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import { getCategories } from "@/lib/api/clientApi"
import PopularCategoriesClient from "./PopularCategories.client"

export default async function PopularCategories() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ["popularCategories", { page: 1 }],
		queryFn: () => getCategories({ page: 1 }),
		staleTime: Cache.Time,
	})

	return (
		<section className={`section ${css.popularCategories}`} id="categories">
			<div className={`container ${css.container}`}>
				<ul className={css.info}>
					<li>
						<h2>Популярні категорії</h2>
					</li>
					<li>
						<Link href={Routes.Categories} className={css.button}>
							Всі категорії
						</Link>
					</li>
				</ul>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<PopularCategoriesClient />
				</HydrationBoundary>
			</div>
		</section>
	)
}
