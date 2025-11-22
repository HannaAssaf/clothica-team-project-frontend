"use client"

import { Keyboard, Navigation, Pagination } from "swiper/modules"
import RunOnlyClient from "../RunOnlyClient/RunOnlyClient"
import { Cloth } from "@/types/shop"
import { Swiper, SwiperSlide } from "swiper/react"
import GoodInfo from "../GoodInfo/GoodInfo"
import GoodsListFallback from "../GoodsListFallback/GoodsListFallback"
import css from "./GoodsList.module.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Props {
	isSwiper?: boolean
	goods: Cloth[]
	sizes?: string
	paginationClass?: string
	leftBtnClass?: string
	rightBtnClass?: string
}

export default function GoodsList({
	isSwiper = false,
	goods,
	sizes,
	paginationClass,
	leftBtnClass,
	rightBtnClass,
}: Props) {
	return isSwiper ? (
		<RunOnlyClient fallback={<GoodsListFallback length={3} />}>
			<Swiper
				modules={[Navigation, Pagination, Keyboard]}
				spaceBetween={32}
				slidesPerView={1}
				className={css.swiper}
				keyboard
				pagination={{
					el: `.${paginationClass}`,
					dynamicBullets: true,
					bulletElement: "li",
				}}
				navigation={{
					prevEl: `.${leftBtnClass}`,
					nextEl: `.${rightBtnClass}`,
				}}
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1440: {
						slidesPerView: 4,
					},
				}}>
				{goods.map(good => (
					<SwiperSlide key={good._id} className={css.slide}>
						<GoodInfo good={good} />
					</SwiperSlide>
				))}
			</Swiper>
		</RunOnlyClient>
	) : (
		<ul className={paginationClass ?? css.swiper}>
			{goods.map(good => (
				<li key={good._id}>
					<GoodInfo good={good} sizes={sizes} />
				</li>
			))}
		</ul>
	)
}
