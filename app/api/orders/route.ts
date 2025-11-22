import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { api, throwAxiosError } from "../api"

export async function GET() {
	try {
		const cookieStore = await cookies()
		const { data } = await api.get("/orders", {
			headers: {
				Cookie: cookieStore.toString(),
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
		const { data } = await api.post("/orders", body)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
