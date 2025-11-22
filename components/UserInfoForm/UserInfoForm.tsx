"use client"

import { useId } from "react"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"
import css from "./UserInfoForm.module.css"
import { editMe } from "@/lib/api/clientApi"
import { useAuthStore } from "@/lib/stores/authStore"
import { OrderUserData } from "@/types/shop"

// Errors, translated to Ukrainian.
Yup.setLocale({
	string: {
		min: "Мінімум ${min} символ(а/ів).",
		max: "Максимум ${max} символ(а/ів).",
	},
	mixed: {
		required: "Це обов'язкове поле.",
	},
})

const validationSchema = Yup.object().shape({
	firstName: Yup.string().trim().min(2).max(32).required(),
	lastName: Yup.string().trim().min(2).max(32).required(),
	phone: Yup.string()
		.trim()
		.max(19)
		.matches(
			/\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/,
			"Номер телефону не валідний формату «+38 (0__) ___-__-__»."
		)
		.required(),
	city: Yup.string().trim().required(),
	postalOffice: Yup.number()
		.min(1, "Мінімум одна не негативна цифра та не нуль.")
		.required(),
})

// Parses "+380_________" into "+38 (0__) ___-__-__".
const parsePhone = (phone: string): string => {
	const match: string[] | null = phone.match(
		/\+38(0\d{2})(\d{3})(\d{2})(\d{2})/
	) // ["+380_________", "+38", "0__", "___", "__", "__"] or null.
	// If match isn't null,
	// then return "+38 (0__) ___-__-__",
	// otherwise return "".
	return match ? `+38 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}` : ""
}

export default function UserInfoForm() {
	const formId: string = useId()
	const user = useAuthStore(state => state.user)
	const setUser = useAuthStore(state => state.setUser)

	// Initial values for Formik form.
	// If user global state isn't null,
	// then values are taken from there,
	// otherwise strings are "" and numbers are 1.
	const initialValues: OrderUserData = {
		firstName: user?.firstName ?? "",
		lastName: user?.lastName ?? "",
		phone: parsePhone(user?.phone ?? ""),
		city: user?.city ?? "",
		postalOffice: user?.postalOffice ?? 1,
	}

	// Parses into "+38 (0__) ___-__-__" format during inputting.
	const handleInputNumber = (
		event: React.KeyboardEvent<HTMLInputElement>
	): void => {
		const value: string = event.currentTarget.value
		// Leaves only digits.
		const digits: string = value.replace(/\D/g, "")
		const match: string[] | null = digits.match(
			/(\d{0,2}0)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/
		) // might be from ["__0", "__0"] to ["__0_________", "__0", "__", "___", "__", "__"] or null.

		// Initializes value.
		let newValue: string = "+38 (0"

		// If match is null,
		// then set currentTarget to newValue and break function.
		if (!match) {
			event.currentTarget.value = newValue
			return
		}

		// If "__" exists,
		// then add it to newValue.
		if (match[2]) newValue += match[2]

		// If "___" exists,
		// then add ") " + it to newValue.
		if (match[3]) newValue += `) ${match[3]}`

		// If "__" exists,
		// then add it to newValue.
		if (match[4]) newValue += `-${match[4]}`

		// If "__" exists,
		// then add it to newValue.
		if (match[5]) newValue += `-${match[5]}`

		// Sets currentTarget to newValue.
		event.currentTarget.value = newValue
	}

	const handleSubmit = async (
		values: OrderUserData /*object, taken from the form values.*/,
		actions: FormikHelpers<OrderUserData> /*object with Formik functions, related to the form; given by Formik library.*/
	): Promise<void> => {
		try {
			// Parses "+38 (0__) ___-__-__" into "+380_________".
			values.phone = values.phone
				.replace(" (", "")
				.replace(") ", "")
				.replace(/-/g, "")

			// Requests patch on /users/me.
			await editMe(values)
			// Updates user global state.
			setUser({
				...user!,
				firstName: values.firstName,
				lastName: values.lastName,
				phone: values.phone,
				city: values.city,
				postalOffice: values.postalOffice,
			})
			// Sets phone field value to parsed phone from "+380_________" to "+38 (0__) ___-__-__".
			actions.setFieldValue("phone", parsePhone(values.phone))
			// Notifies about successful updating.
			toast.success("Дані успішно оновлено!")
		} catch {
			// Notifies about that something went wrong.
			toast.error("Щось пішло не так під час оновлення даних...")
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}>
			<Form className={css.form}>
				<div className={css.groupedGroups}>
					<div className={css.fieldGroup}>
						<label htmlFor={`${formId}-firstName`}>Імʼя*</label>
						<Field
							className={css.field}
							id={`${formId}-firstName`}
							type="text"
							name="firstName"
							placeholder="Ваше імʼя"
							minLength="2"
							maxLength="32"
						/>
						<ErrorMessage
							className={css.error}
							name="firstName"
							component="p"
						/>
					</div>
					<div className={css.fieldGroup}>
						<label htmlFor={`${formId}-lastName`}>Прізвище*</label>
						<Field
							className={css.field}
							id={`${formId}-lastName`}
							type="text"
							name="lastName"
							placeholder="Ваше прізвище"
							minLength="2"
							maxLength="32"
						/>
						<ErrorMessage className={css.error} name="lastName" component="p" />
					</div>
				</div>

				<div className={css.fieldGroup}>
					<label htmlFor={`${formId}-phone`}>Номер телефону*</label>
					<Field
						className={css.field}
						id={`${formId}-phone`}
						type="tel"
						name="phone"
						placeholder="+38 (0__) ___-__-__"
						maxLength="19"
						pattern="\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}"
						onInput={handleInputNumber}
					/>
					<ErrorMessage className={css.error} name="phone" component="p" />
				</div>

				<div className={css.groupedGroups}>
					<div className={css.fieldGroup}>
						<label htmlFor={`${formId}-city`}>Місто доставки*</label>
						<Field
							className={css.field}
							id={`${formId}-city`}
							type="text"
							name="city"
							placeholder="Ваше місто"
						/>
						<ErrorMessage className={css.error} name="city" component="p" />
					</div>
					<div className={css.fieldGroup}>
						<label htmlFor={`${formId}-postalOffice`}>
							Номер відділення Нової Пошти*
						</label>
						<Field
							className={css.field}
							id={`${formId}-postalOffice`}
							type="number"
							name="postalOffice"
							placeholder="1"
							min="1"
						/>
						<ErrorMessage
							className={css.error}
							name="postalOffice"
							component="p"
						/>
					</div>
				</div>
				<button className={css.button} type="submit">
					Зберегти зміни
				</button>
			</Form>
		</Formik>
	)
}
