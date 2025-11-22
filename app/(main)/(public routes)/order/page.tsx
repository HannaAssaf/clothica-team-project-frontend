import CreateOrderForm from "@/components/CreateOrderForm/CreateOrderForm"
import GoodsOrderList from "@/components/GoodsOrderList/GoodsOrderList"
import css from "./CreateOrder.module.css"

export default function CreateOrder() {
	return (
		<section className={`section ${css.order}`}>
			<div className="container">
				<h1>Оформити замовлення</h1>
				<div className={css.blocks}>
					<div className={css.orders}>
						<h2>Товари</h2>
						<GoodsOrderList />
					</div>
					<div className={css.form}>
						<h2>Особиста інформація</h2>
						<CreateOrderForm />
					</div>
				</div>
			</div>
		</section>
	)
}
