import { getSingleCategory } from "@/lib/api/clientApi"
import { Cache } from "@/config/config"
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"
import SingleCategoryClient from "./SingleCategory.client"

interface Props {
	params: Promise<{ id: string }>
}

export default async function GetGoodsByCategory({ params }: Props) {
	const { id } = await params
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ["category", id],
		queryFn: () => getSingleCategory(id),
		staleTime: Cache.Time,
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SingleCategoryClient />
		</HydrationBoundary>
	)
}
