import { cookies } from "next/headers"
import { api, throwAxiosError } from "../../api"
import { NextResponse } from "next/server"

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
