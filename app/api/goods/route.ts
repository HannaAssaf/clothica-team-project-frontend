import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../api"

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams
		const category = query.get("category")
		const sizes = query.get("sizes")
		const price = query.get("price")
		const color = query.get("color")
		const gender = query.get("gender")
		const sort = query.get("sort")
		const page = query.get("page") ?? 1
		const perPage = query.get("perPage") ?? 8
		const { data } = await api.get("/goods", {
			params: {
				...(category && { category }),
				...(sizes && { sizes }),
				...(price && { price }),
				...(color && { color }),
				...(gender && { gender }),
				...(sort && { sort }),
				...(page && { page }),
				...(perPage && { perPage }),
			},
		})

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
