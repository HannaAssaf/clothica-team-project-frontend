import { NextResponse } from "next/server"
import { api, throwAxiosError } from "../../api"
import { cookies } from "next/headers"

export async function POST() {
	try {
		const cookieStore = await cookies()

		await api.post(
			"/auth/logout",
			{},
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			}
		)

		cookieStore.delete("accessToken")
		cookieStore.delete("refreshToken")

		return NextResponse.json(
			{ messsage: "Logged out successfully" },
			{ status: 200 }
		)
	} catch (error) {
		return throwAxiosError(error)
	}
}
