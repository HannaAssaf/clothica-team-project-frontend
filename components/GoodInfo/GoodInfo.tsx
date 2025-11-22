"use client"

import { Cloth } from "@/types/shop"
import Image from "next/image"
import Link from "next/link"
import { Routes } from "@/config/config"
import css from "./GoodInfo.module.css"

interface Props {
	good: Cloth
	sizes?: string
}

export default function GoodInfo({ good, sizes }: Props) {
	return (
		<>
			<Image
				src={good.image}
				sizes={
					sizes ??
					"(max-width: 768px) 335px, (max-width: 1439px) 336px, (min-width: 1440px) 304px"
				}
				width={335}
				height={412}
				className={css.img}
				alt={good.name}
			/>
			<div className={css.block}>
				<h3 className={css.h3}>{good.name}</h3>
				<span>
					{good.price.value} {good.price.currency}
				</span>
			</div>
			<p className={css.p}>
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
			<Link
				href={`${Routes.Goods}/${good._id}`}
				className={`${css.button} ${css.details}`}>
				Детальніше
			</Link>
		</>
	)
}
