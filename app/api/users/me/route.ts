import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../../api"
import { cookies } from "next/headers"

export async function GET() {
	try {
		const cookieStore = await cookies()
		const { data } = await api.get("/auth/me", {
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
		const cookieStore = await cookies()
		const { data } = await api.post(`/users/me/order`, body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const body = await request.json()
		const cookieStore = await cookies()
		const { data } = await api.patch("/users/me", body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
