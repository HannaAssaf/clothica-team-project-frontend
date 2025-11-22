"use client"

import { createPortal } from "react-dom"
import { useEffect } from "react"
import css from "./Modal.module.css"

interface Props {
	children: React.ReactNode
	modalClass: string
	onClose: () => void
}

export default function Modal({ children, onClose, modalClass }: Props) {
	const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = ""
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [onClose])

	if (typeof window !== "object") {
		return null
	}

	return createPortal(
		<div
			className={css.backdrop}
			role="dialog"
			aria-modal="true"
			onClick={handleBackdrop}>
			<div className={`${css.modal} ${modalClass}`}>{children}</div>
		</div>,
		document.body
	)
}
