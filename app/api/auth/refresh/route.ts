import { cookies } from "next/headers"
import { api, throwAxiosError } from "../../api"
import { NextRequest, NextResponse } from "next/server"
import { Routes } from "@/config/config"
import { parse } from "cookie"

export async function GET(request: NextRequest) {
	try {
		const cookieStore = await cookies()
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

			return NextResponse.json(
				{ message: "Session refreshed" },
				{ status: 200 }
			)
		}

		return NextResponse.redirect(new URL(Routes.Login, request.url))
	} catch (error) {
		return throwAxiosError(error)
	}
}
