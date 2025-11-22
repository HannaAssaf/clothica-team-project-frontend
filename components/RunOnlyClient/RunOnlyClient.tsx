"use client"

import { useEffect, useState } from "react"

export default function RunOnlyClient({
	children,
	fallback = "",
}: Readonly<{ children: React.ReactNode; fallback?: React.ReactNode }>) {
	const [isClient, setIsClient] = useState<boolean>(false)

	useEffect(() => {
		const update = () => setIsClient(true)
		update()
	}, [])

	return isClient ? children : fallback
}
