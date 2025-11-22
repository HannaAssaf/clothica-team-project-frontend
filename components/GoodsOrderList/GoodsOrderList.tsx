"use client"

import { getSingleGood } from "@/lib/api/clientApi"
import { useBasketStore } from "@/lib/stores/basketStore"
import { useQueries } from "@tanstack/react-query"
import Image from "next/image"
import css from "./GoodsOrderList.module.css"

export default function GoodsOrderList({ isModal }: { isModal?: boolean }) {
	const basket = useBasketStore(state => state.basket)
	const setBasket = useBasketStore(state => state.setBasket)

	const goods = useQueries({
		queries: basket.map(good => ({
			queryKey: ["basket", { id: good.id, color: good.color, size: good.size }],
			queryFn: () => getSingleGood(good.id),
			refetchOnMount: false,
			staleTime: 24 * 60 * 60 * 1000,
		})),
	})

	const sum = goods.reduce(
		(acc, good, index) =>
			(acc += (good.data?.price.value ?? 0) * basket[index].amount),
		0
	)

	const changeBasketAmount = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const target = e.currentTarget
		const value = parseInt(target.value)

		if (!value || value < 1 || value > 99) {
			return
		}

		const newBasket = [...basket]

		newBasket[index] = {
			...newBasket[index],
			amount: value,
		}

		setBasket(newBasket)
	}

	const removeFromBasket = (index: number) => {
		const newBasket = basket.filter((_, sid) => sid != index)
		setBasket(newBasket)
	}

	return (
		goods && (
			<>
				<ul className={isModal ? css.modal : ""}>
					{goods.map(
						({ data: good }, index) =>
							good && (
								<li
									key={
										good._id +
										basket[index].color +
										basket[index].size +
										(isModal ? "_modal" : "")
									}
									className={css.good}>
									<Image
										src={good.image}
										width={82}
										height={101}
										className={css.image}
										alt={good.name}
									/>
									<div
										aria-label="Cloth from basket information"
										className={css.goodInfo}>
										<h3 className={css.name}>
											{good.name}
											<p>
												<svg className="icon" width={16} height={16}>
													<use href="/icons.svg#i-star-filled"></use>
												</svg>
												{good.stars}
												<span>
													<svg className="icon" width={16} height={16}>
														<use href="/icons.svg#i-comment"></use>
													</svg>
													{good.feedbacks.length}
												</span>
											</p>
										</h3>
										<div className={css.priceAmountDelete}>
											<p>{good.price.value} грн</p>
											<input
												type="number"
												min={1}
												max={99}
												onChange={e => changeBasketAmount(e, index)}
												value={basket[index].amount}
											/>
											<button
												type="button"
												onClick={() => removeFromBasket(index)}>
												<svg className="icon" width={24} height={24}>
													<use href="/icons.svg#i-trash"></use>
												</svg>
											</button>
										</div>
									</div>
								</li>
							)
					)}
				</ul>
				<hr className={css.hr} />
				<p className={css.sumBefore}>
					Проміжний підсумок
					<span>{sum} грн</span>
				</p>
				<p className={css.delivery}>Доставка</p>
				<p className={css.sum}>
					Всього
					<span>{sum} грн</span>
				</p>
			</>
		)
	)
}
