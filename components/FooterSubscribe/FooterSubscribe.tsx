"use client"

import { useEffect, useState } from "react"
import RunOnlyClient from "../RunOnlyClient/RunOnlyClient"
import { isAxiosError } from "axios"
import { subscribe } from "@/lib/api/clientApi"
import { toast } from "react-hot-toast"
import css from "./FooterSubscribe.module.css"

export default function FooterSubscribe() {
	const [error, setError] = useState<string>("")

	const onSubscribe = async (formData: FormData) => {
		const email = formData.get("email")
		setError("")

		if (!email) {
			setError("Email is required")
			return
		}

		try {
			await subscribe(email.toString())
			toast.success("You successfully subscribed to our newsletters.")
		} catch (error) {
			if (isAxiosError(error)) {
				setError(error.response?.data.error ?? error.message)
			} else {
				setError("Internal server error")
			}
		}
	}

	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error])

	return (
		<RunOnlyClient>
			<form className={css.subscribe} action={onSubscribe}>
				<label htmlFor="email">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Введіть ваш email"
					/>
					<button type="submit" className={css.button}>
						Підписатися
					</button>
				</label>
			</form>
		</RunOnlyClient>
	)
}
