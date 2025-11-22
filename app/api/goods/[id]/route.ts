import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../../api"
import { cookies } from "next/headers"

interface Props {
	params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
	try {
		const { id } = await params
		const { data } = await api.get(`/goods/${id}`)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}

export async function POST(request: NextRequest, { params }: Props) {
	try {
		const { id } = await params
		const body = await request.json()
		const cookieStore = await cookies()
		const { data } = await api.post(`/goods/${id}/review`, body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
