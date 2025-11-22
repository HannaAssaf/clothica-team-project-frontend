"use client"

import { useQuery } from "@tanstack/react-query"
import GoodsPage from "../../page"
import { useRouter, useParams } from "next/navigation"
import { getSingleCategory } from "@/lib/api/clientApi"
import { Cache, Routes } from "@/config/config"
import MessageNoInfo from "@/components/MessageNoInfo/MessageNoInfo"

export default function SingleCategoryClient() {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()
	const { data: category, isSuccess } = useQuery({
		queryKey: ["category", id],
		queryFn: () => getSingleCategory(id),
		refetchOnMount: false,
		staleTime: Cache.Time,
	})

	if (!isSuccess && !category) {
		return (
			<section className="section category">
				<div className="container">
					<MessageNoInfo
						text="Категорiя не знайдена, але ви все ще можете знайти iншi товари якi вам до вподоби"
						buttonText="По покупки"
						onClick={() => router.push(Routes.Goods)}
					/>
				</div>
			</section>
		)
	}

	return <GoodsPage category={category._id} />
}
