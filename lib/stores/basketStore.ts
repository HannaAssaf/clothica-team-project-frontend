import { Color, Size } from "@/types/shop"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type BasketProduct = {
	id: string
	size: Size
	color: Color
	amount: number
}

interface BasketStore {
	basket: BasketProduct[]
	setBasket: (basket: BasketProduct[]) => void
	clearBasket: () => void
}

export const useBasketStore = create<BasketStore>()(
	persist(
		set => ({
			basket: [],
			setBasket: basket => set(() => ({ basket })),
			clearBasket: () => set(() => ({ basket: [] })),
		}),
		{
			name: "clothica-basket",
			partialize: state => ({ basket: state.basket }),
		}
	)
)
