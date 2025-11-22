import axios from "axios"

export const getBaseURL = () => {
	return process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: process.env.NEXT_PUBLIC_PRODUCTION_URL
}

export const nextServer = axios.create({
	baseURL: getBaseURL() + "/api",
	withCredentials: true,
})
