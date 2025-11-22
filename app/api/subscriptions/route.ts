import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../api"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { data } = await api.post("/subscriptions", body)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
