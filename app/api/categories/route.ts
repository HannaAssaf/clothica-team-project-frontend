import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../api"

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams
		const page = query.get("page") ?? 1
		const perPage = query.get("perPage") ?? 4
		const { data } = await api.get("/categories", {
			params: {
				...(page && { page }),
				...(perPage && { perPage }),
			},
		})
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
