"use client"
import css from "./GoodPage.module.css"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import GoodForPurchase from "@/components/GoodForPurchase/GoodForPurchase"
import GoodReviews from "@/components/GoodReviews/GoodReviews"
import MessageNoInfo from "@/components/MessageNoInfo/MessageNoInfo"
import { getSingleGood } from "@/lib/api/clientApi"
import { Cache, Routes } from "@/config/config"

interface Props {
	id: string
}

export default function GoodPageClient({ id }: Props) {
	const router = useRouter()

	const { data: good } = useQuery({
		queryKey: ["good", id],
		queryFn: () => getSingleGood(id),
		refetchOnMount: false,
		staleTime: Cache.Time,
	})

	return (
		<div className={`${css.container} container`}>
			{good ? (
				<>
					<GoodForPurchase good={good} />
					<GoodReviews feedbacks={good.feedbacks} goodId={id} />
				</>
			) : (
				<MessageNoInfo
					text="Товар не знайдено"
					buttonText="Повернутися до товарів"
					onClick={() => router.push(Routes.Goods)}
					globalClass="messageNoInfoGoodPage"
				/>
			)}
		</div>
	)
}
