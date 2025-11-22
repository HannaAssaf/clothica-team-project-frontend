"use client"

import Modal from "@/components/Modal/Modal"
import css from "./BasketModal.module.css"
import { useRouter } from "next/navigation"
import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList"
import MessageNoInfo from "@/components/MessageNoInfo/MessageNoInfo"
import { useBasketStore } from "@/lib/stores/basketStore"
import { Routes } from "@/config/config"
import Link from "next/link"

export default function BasketModal() {
	const router = useRouter()
	const onClose = () => router.back()

	const basket = useBasketStore(state => state.basket)

	return (
		<Modal onClose={onClose} modalClass={css.modal}>
			<div className={`container ${css.container}`}>
				<button className={css.closeBtn} onClick={onClose}>
					<svg width={24} height={24}>
						<use href="/icons.svg#i-cross"></use>
					</svg>
				</button>
				<h2 className={css.title}>Ваш кошик</h2>
				{basket.length > 0 ? (
					<>
						<GoodsOrderList isModal={true} />
						<div className={css.btnContainer}>
							<Link
								className={css.continueBtn}
								href={Routes.Goods}
								onClick={() => {
									onClose()
									setTimeout(() => router.push(Routes.Goods))
								}}>
								Продовжити покупки
							</Link>
							<Link
								className={css.orderBtn}
								href={Routes.Order}
								onClick={() => {
									onClose()
									setTimeout(() => router.push(Routes.Order))
								}}>
								Оформити замовлення
							</Link>
						</div>
					</>
				) : (
					<MessageNoInfo
						text="Ваш кошик порожній, мершій до покупок!"
						buttonText="До покупок"
						onClick={() => {
							onClose()
							setTimeout(() => router.push(Routes.Goods))
						}}
					/>
				)}
			</div>
		</Modal>
	)
}
