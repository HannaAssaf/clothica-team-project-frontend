"use client"

import Image from "next/image"
import { Keyboard, Navigation } from "swiper/modules"
import RunOnlyClient from "../RunOnlyClient/RunOnlyClient"
import { Category } from "@/types/shop"
import { Swiper, SwiperSlide } from "swiper/react"
import css from "./CategoriesList.module.css"
import CategoriesListFallback from "../CategoriesListFallback/CategoriesListFallback"
import "swiper/css"
import "swiper/css/navigation"
import { Routes } from "@/config/config"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props {
	isSwiper?: boolean
	swiperClass?: string
	categories: Category[]
	prefix?: string
	leftBtnClass?: string
	rightBtnClass?: string
}

export default function CategoriesList({
	prefix,
	isSwiper = false,
	swiperClass,
	categories,
	leftBtnClass,
	rightBtnClass,
}: Props) {
	const router = useRouter()

	return isSwiper ? (
		<RunOnlyClient fallback={<CategoriesListFallback length={3} />}>
			<Swiper
				modules={[Navigation, Keyboard]}
				spaceBetween={32}
				slidesPerView={1}
				className={swiperClass ?? css.swiper}
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
				{categories.map(category => (
					<SwiperSlide key={category._id + prefix}>
						<Image
							src={category.image}
							sizes="(max-width: 768px) 335px, (max-width: 1439px) 336px, (min-width: 1440px) 416px"
							width={335}
							height={223}
							onClick={() =>
								router.push(`${Routes.Goods}/category/${category._id}`)
							}
							alt={category.name}
						/>
						<Link href={`${Routes.Goods}/category/${category._id}`}>
							{category.name}
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</RunOnlyClient>
	) : (
		<ul className={swiperClass ?? css.swiper}>
			{categories.map(category => (
				<li key={category._id}>
					<Image
						src={category.image}
						sizes="(max-width: 768px) 335px, (max-width: 1439px) 336px, (min-width: 1440px) 416px"
						width={335}
						height={223}
						onClick={() =>
							router.push(`${Routes.Goods}/category/${category._id}`)
						}
						alt={category.name}
					/>
					<Link href={`${Routes.Goods}/category/${category._id}`}>
						{category.name}
					</Link>
				</li>
			))}
		</ul>
	)
}
