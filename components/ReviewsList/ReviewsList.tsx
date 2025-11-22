"use client"

import { Keyboard, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Routes } from "@/config/config"
import RunOnlyClient from "../RunOnlyClient/RunOnlyClient"
import Link from "next/link"
import css from "./ReviewsList.module.css"
import "swiper/css"
import "swiper/css/navigation"
import ReviewsListFallback from "../ReviewsListFallback/ReviewsListFallback"
import { FeedbackWithGoodIdObject } from "@/types/shop"

interface Props {
	feedbacks: FeedbackWithGoodIdObject[]
	leftBtnClass?: string
	rightBtnClass?: string
}

const checkStars = (stars: number, checkOn: number): string =>
	stars >= checkOn ? "-filled" : stars === checkOn - 0.5 ? "-half" : ""

export default function ReviewsList({
	feedbacks,
	leftBtnClass,
	rightBtnClass,
}: Props) {
	return (
		<RunOnlyClient fallback={<ReviewsListFallback length={3} />}>
			<Swiper
				modules={[Navigation, Keyboard]}
				spaceBetween={32}
				slidesPerView={1}
				className={css.swiper}
				keyboard
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
						slidesPerView: 3,
					},
				}}>
				{feedbacks.map(feedback => (
					<SwiperSlide key={feedback._id} className={css.slide}>
						<span className="rating">
							{Array.from({ length: 5 }).map((_, star) => (
								<svg
									key={`${feedback._id}${star}`}
									className="icon"
									width={26}
									height={26}>
									<use
										href={`/icons.svg#i-star${checkStars(feedback.rate, star + 1)}`}></use>
								</svg>
							))}
						</span>
						<p>{feedback.description}</p>
						<h3>
							{feedback.author}
							<Link
								href={`${Routes.Goods}/${feedback.goodId._id}`}
								className={css.link}>
								{feedback.goodId.name}
							</Link>
						</h3>
					</SwiperSlide>
				))}
			</Swiper>
		</RunOnlyClient>
	)
}
