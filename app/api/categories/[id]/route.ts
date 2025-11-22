import { NextRequest, NextResponse } from "next/server"
import { api, throwAxiosError } from "../../api"

interface Props {
	params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
	try {
		const { id } = await params
		const { data } = await api.get(`/categories/${id}`)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return throwAxiosError(error)
	}
}
