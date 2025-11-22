import { NextResponse } from "next/server"
import { api } from "../../api"
import { cookies } from "next/headers"
import { parse } from "cookie"

export async function GET() {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get("accessToken")?.value
		const refreshToken = cookieStore.get("refreshToken")?.value

		if (accessToken) {
			return NextResponse.json({ success: true }, { status: 200 })
		}

		if (refreshToken) {
			const apiResponse = await api.get("/auth/refresh", {
				headers: {
					Cookie: cookieStore.toString(),
				},
			})
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
				
				return NextResponse.json({ success: true }, { status: 200 })
			}

			return NextResponse.json({ success: false }, { status: 200 })
		}

		return NextResponse.json({ success: false }, { status: 200 })
	} catch {
		return NextResponse.json({ success: false }, { status: 200 })
	}
}
