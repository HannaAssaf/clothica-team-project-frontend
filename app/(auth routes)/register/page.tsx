"use client"

import AuthNavigation from "@/components/AuthNavigation/AuthNavigation"
import { Routes } from "@/config/config"
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik"
import { register, RegisterRequest } from "@/lib/api/clientApi"
import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/lib/stores/authStore"
import { useRouter } from "next/navigation"
import * as Yup from "yup"
import toast from "react-hot-toast"
import css from "../AuthPages.module.css"

const initialValues: RegisterRequest = {
	firstName: "",
	phone: "",
	password: "",
}

Yup.setLocale({
	string: {
		min: "Мінімум ${min} символ(а/ів).",
		max: "Максимум ${max} символ(а/ів).",
		length: "Повинно бути ${length} символ(а/ів).",
	},
	mixed: {
		required: "Це обов'язкове поле.",
	},
})

const validationSchema = Yup.object().shape({
	firstName: Yup.string().max(32).required(),
	phone: Yup.string()
		.length(19)
		.matches(
			/\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/,
			"Номер телефону не валідного формату. Повинен бути: +38 (0__) ___-__-__"
		)
		.required(),
	password: Yup.string().min(8).max(64).required(),
})

export default function RegisterPage() {
	const setUser = useAuthStore(state => state.setUser)
	const router = useRouter()

	const { mutate } = useMutation({
		mutationFn: async (values: RegisterRequest) => {
			const user = await register(values)
			if (user) {
				setUser(user)
			}
			return user
		},
		onSuccess: () => {
			toast.success("You successfully signed up!")
			router.push(Routes.Home)
		},
		onError: () => toast.error("User already exists"),
	})

	const onSubmit = async (
		values: RegisterRequest,
		helpers: FormikHelpers<RegisterRequest>
	) => {
		values.phone = values.phone
			.replace(" (", "")
			.replace(") ", "")
			.replaceAll("-", "")

		mutate(values)
		helpers.resetForm()
	}

	const formatPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		const digits = value.replace(/\D/g, "")
		const match = digits.match(/(\d{0,2}0)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)

		let newValue = "+38 (0"

		if (!match) {
			e.currentTarget.value = newValue
			return
		}

		if (match[2]) newValue += `${match[2]}`
		if (match[3]) newValue += `) ${match[3]}`
		if (match[4]) newValue += `-${match[4]}`
		if (match[5]) newValue += `-${match[5]}`

		e.currentTarget.value = newValue
	}

	return (
		<section className={`section ${css.auth}`}>
			<div className="container">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}>
					<Form className={css.form}>
						<AuthNavigation route={Routes.Register} />
						<h1>Реєстрація</h1>
						<label htmlFor="firstName">
							Імʼя*
							<Field
								type="text"
								name="firstName"
								id="firstName"
								placeholder="Ваше ім'я"
							/>
							<ErrorMessage
								name="firstName"
								component="span"
								className={css.error}
							/>
						</label>
						<label htmlFor="phone">
							Номер телефону*
							<Field
								type="text"
								name="phone"
								id="phone"
								onInput={formatPhone}
								placeholder="+38 (0__) ___-__-__"
							/>
							<ErrorMessage
								name="phone"
								component="span"
								className={css.error}
							/>
						</label>
						<label htmlFor="password">
							Пароль*
							<Field
								type="password"
								name="password"
								id="password"
								placeholder="********"
							/>
							<ErrorMessage
								name="password"
								component="span"
								className={css.error}
							/>
						</label>
						<button type="submit">Зареєструватися</button>
					</Form>
				</Formik>
			</div>
		</section>
	)
}
