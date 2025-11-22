"use client"

import css from "./MessageNoInfo.module.css"

interface Props {
	text: string
	buttonText: string
	onClick: () => void
	globalClass?: string
}

export default function MessageNoInfo({ text, buttonText, onClick, globalClass = "" }: Props) {
	return (
		<div className={`${css.messageContainer} ${globalClass}`}>
			<p>{text}</p>
			<button onClick={onClick}>{buttonText}</button>
		</div>
	)
}
