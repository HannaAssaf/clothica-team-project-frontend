import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { Routes } from "./config/config"
import { checkServerSession } from "./lib/api/serverApi"
import { parse } from "cookie"

const authRoutes = ["/login", "/register"]
const privateRoutes = ["/profile"]

export async function proxy(request: NextRequest) {
	const fullURL = request.url
	const cookieStore = await cookies()
	const accessToken = cookieStore.get("accessToken")?.value
	const refreshToken = cookieStore.get("refreshToken")?.value
	const { pathname } = request.nextUrl
	const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
	const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route))

	if (!accessToken) {
		if (refreshToken) {
			const response = await checkServerSession()
			const setCookie = response.headers["set-cookie"]

			if (setCookie) {
				const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie]
				for (const cookie of cookiesArray) {
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

				if (isAuthRoute) {
					return NextResponse.redirect(new URL(Routes.Home, fullURL), {
						headers: {
							Cookie: cookieStore.toString(),
						},
					})
				}

				return NextResponse.next({
					headers: {
						Cookie: cookieStore.toString(),
					},
				})
			}
		}

		if (isAuthRoute) {
			return NextResponse.next()
		}

		if (isPrivateRoute) {
			return NextResponse.redirect(new URL(Routes.Login, fullURL))
		}

		return NextResponse.next()
	}

	if (isAuthRoute) {
		return NextResponse.redirect(new URL(Routes.Home, fullURL), {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
	}

	return NextResponse.next({
		headers: {
			Cookie: cookieStore.toString(),
		},
	})
}

export const config = {
	matcher: [
		"/",
		"/profile",
		"/categories",
		"/goods",
		"/goods/:path*",
		"/order",
		"/login",
		"/register",
	],
}
