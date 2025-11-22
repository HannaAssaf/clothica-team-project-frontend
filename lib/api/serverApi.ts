import { cookies } from "next/headers"
import { nextServer } from "./api"
import { User } from "@/types/user"
import { Order } from "@/types/shop"

export const checkServerSession = async () => {
	const cookieStore = await cookies()
	const response = await nextServer.get("/auth/session", {
		headers: {
			Cookie: cookieStore.toString(),
		},
	})
	return response
}

export const getServerMe = async () => {
	const cookieStore = await cookies()
	const { data } = await nextServer.get<User>("/users/me", {
		headers: {
			Cookie: cookieStore.toString(),
		},
	})
	return data
}

export const getServerOrders = async () => {
	const cookieStore = await cookies()
	const { data } = await nextServer.get<Order[]>("/orders", {
		headers: {
			Cookie: cookieStore.toString(),
		},
	})
	return data
}
