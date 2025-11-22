import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../../api"
import { parse } from "cookie"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const cookieStore = await cookies()
		const apiResponse = await api.post("/auth/login", body)
		const setCookie = apiResponse.headers["set-cookie"]

		if (setCookie) {
			const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

			for (const cookie of cookieArray) {
				const parsed = parse(cookie)
				const options = {
					expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
					path: parsed.Path,
					maxAge: Number(parsed["Max-Age"]),
				}

				if (parsed.accessToken) {
					cookieStore.set("accessToken", parsed.accessToken, options)
				}

				if (parsed.refreshToken) {
					cookieStore.set("refreshToken", parsed.refreshToken, options)
				}
			}

			return NextResponse.json(apiResponse.data, { status: 200 })
		}

		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
