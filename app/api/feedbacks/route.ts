import { api, throwAxiosError } from "@/app/api/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams
		const page = query.get("page") ?? 1
		const perPage = query.get("perPage") ?? 6
		const goodId = query.get("goodId")
		const { data } = await api.get("/feedbacks", {
			params: {
				...(page && { page }),
				...(perPage && { perPage }),
				...(goodId && { goodId }),
			},
		})
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { data } = await api.post("/feedbacks", body)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
