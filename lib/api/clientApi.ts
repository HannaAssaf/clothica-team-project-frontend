import { User } from "@/types/user"
import { nextServer } from "./api"
import {
	Category,
	Cloth,
	Feedback,
	FeedbackWithGoodIdObject,
	Order,
	OrderUserData,
	Status,
} from "@/types/shop"

export type RegisterRequest = Pick<User, "firstName" | "phone"> & {
	password: string
}

export type LoginRequest = Omit<RegisterRequest, "firstName">

export type OrderData = Omit<
	Order,
	"_id" | "date" | "status" | "sum" | "userId" | "orderNum"
>

type GetGoods = Partial<{
	category: string
	sizes: string
	price: string
	color: string
	gender: string
	page: number
	perPage: number
	sort: "desc"
}>

type GetCategories = Partial<{
	page: number
	perPage: number
}>

type CategoriesResponse = Promise<
	Paginated & {
		totalCategories: number
		categories: Category[]
	}
>

type GetFeedbacks = Partial<{
	page: number
	perPage: number
	goodId: string
}>

type FeedbacksResponse = Promise<
	Paginated & {
		totalFeedbacks: number
		feedbacks: FeedbackWithGoodIdObject[]
	}
>

type GoodsResponse = Promise<
	Paginated & {
		totalGoods: number
		goods: Cloth[]
	}
>

type Paginated = {
	page: number
	perPage: number
	totalPages: number
}

export async function getGoods({
	category,
	sizes,
	price,
	color,
	gender,
	page,
	perPage,
	sort,
}: GetGoods) {
	const { data } = await nextServer.get<GoodsResponse>(`/goods`, {
		params: {
			...(category && { category }),
			...(sizes && { sizes }),
			...(price && { price }),
			...(color && { color }),
			...(gender && { gender }),
			...(page && { page }),
			...(perPage && { perPage }),
			...(sort && { sort }),
		},
	})
	return data
}

export async function getOrders() {
	const { data } = await nextServer.get("/orders")
	return data
}

export async function createOrder(orderData: OrderData) {
	const { data } = await nextServer.post("/orders", orderData)
	return data
}

export async function createOrderUser(orderData: OrderData) {
	const { data } = await nextServer.post("/orders/user", orderData)
	return data
}

export async function patchOrder(orderId: string, status: Status) {
	const { data } = await nextServer.patch(`/orders/${orderId}`, { status })
	return data
}

export async function getSingleGood(id: string) {
	const { data } = await nextServer.get<Cloth>(`/goods/${id}`)
	return data
}

export async function getCategories({ page, perPage }: GetCategories) {
	const { data } = await nextServer.get<CategoriesResponse>("/categories", {
		params: {
			...(page && { page }),
			...(perPage && { perPage }),
		},
	})
	return data
}

export async function getSingleCategory(id: string) {
	const { data } = await nextServer.get<Category>(`/categories/${id}`)
	return data
}

export async function getFeedbacks({ page, perPage, goodId }: GetFeedbacks) {
	const { data } = await nextServer.get<FeedbacksResponse>("/feedbacks", {
		params: {
			...(page && { page }),
			...(perPage && { perPage }),
			...(goodId && { goodId }),
		},
	})
	return data
}

export async function login(userData: LoginRequest) {
	const { data } = await nextServer.post<User>("/auth/login", userData)
	return data
}

export async function register(userData: RegisterRequest) {
	const { data } = await nextServer.post<User>("/auth/register", userData)
	return data
}

export async function checkSession() {
	const { data } = await nextServer.get<{ success: boolean }>("/auth/session")
	return data.success
}

export async function getMe() {
	const { data } = await nextServer.get<User>("/auth/me")
	return data
}

export async function editMe(userData: OrderUserData) {
	const { data } = await nextServer.patch<User>("/users/me", userData)
	return data
}

export async function createFeedback(
	reviewData: Omit<Feedback, "_id" | "date">
) {
	const { data } = await nextServer.post(`/feedbacks`, reviewData)
	return data
}

export async function subscribe(email: string): Promise<{ message: string }> {
	const { data } = await nextServer.post(`/subscriptions`, { email })
	return data
}

export async function logout() {
	await nextServer.post("/auth/logout")
}
