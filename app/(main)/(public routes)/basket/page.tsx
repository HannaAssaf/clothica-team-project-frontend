import { Routes } from "@/config/config"
import { redirect } from "next/navigation"

export default function BasketPage() {
	redirect(Routes.Order)
}
