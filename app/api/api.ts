import axios, { isAxiosError } from "axios"
import { NextResponse } from "next/server"

export const throwAxiosError = (error: unknown) => {
	if (isAxiosError(error)) {
		return NextResponse.json(
			{
				error: error.response?.data.error ?? error.message,
			},
			{
				status: error.status,
			}
		)
	}

	return NextResponse.json({ error: "Unknown server error" }, { status: 500 })
}

export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
	withCredentials: true,
})
