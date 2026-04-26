"use server"

import { cookies } from "next/headers"
import { Locale, defaultLocale } from "@/config"

const COOKIE_NAME = "NEXT_LOCALE"

export const getUserLocale = async () => {
    const cookieStore = await cookies()
    return cookieStore.get(COOKIE_NAME)?.value || defaultLocale
}

export const setUserLocale = async (locale: Locale) => {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, locale)
}
