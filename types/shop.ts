export type Cloth = {
	_id: string
	name: string
	price: {
		value: number
		currency: string
	}
	category: {
		_id: string
		name: string
	}
	image: string
	sizes: Size[]
	colors: Color[]
	prevDescription: string
	description: string
	feedbacks: FeedbackWithGoodIdObject[]
	stars: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
	gender: "men" | "women" | "unisex"
	characteristics: string[]
}

export type Size = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL"
export type Status = "processing" | "packing" | "success" | "declined"
export type Color =
	| "white"
	| "black"
	| "grey"
	| "blue"
	| "green"
	| "red"
	| "pastel"

export type Feedback = {
	_id: string
	author: string
	date: string
	description: string
	rate: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
	goodId: string
}

type GoodId = {
	_id: string
	name: string
}

export interface FeedbackWithGoodIdObject extends Omit<Feedback, "goodId"> {
	goodId: GoodId
}

export type Category = {
	_id: string
	name: string
	image: string
}

export type OrderProduct = {
	id: string
	amount: number
	size: string
	color: string
}

export type OrderUserData = {
	firstName: string
	lastName: string
	phone: string
	city: string
	postalOffice: number
}

export type Order = {
	_id: string
	products: OrderProduct[]
	sum: number
	userId: string
	date: string
	orderNum: number
	comment: string
	status: Status
	userData: OrderUserData
}
