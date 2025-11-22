"use client"

import { checkSession, getMe } from "@/lib/api/clientApi"
import { useAuthStore } from "@/lib/stores/authStore"
import { useEffect } from "react"

export default function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const setUser = useAuthStore(state => state.setUser)
	const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated)

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const isAuthenticated = await checkSession()
			if (isAuthenticated) {
				const user = await getMe()
				if (user) {
					setUser(user)
				}
			} else {
				clearIsAuthenticated()
			}
		}
		fetchCurrentUser()
	}, [setUser, clearIsAuthenticated])

	return children
}
