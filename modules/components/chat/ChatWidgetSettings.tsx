"use client"

import { useTransition, useEffect, useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { setUserLocale } from "@/services/locale"
import { Locale } from "@/config"
import { useRouter } from "next/navigation"
import useChatStore from "@/common/stores/chat"
import { IoClose } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import { AiOutlineLoading3Quarters as Spinner } from "react-icons/ai"
import { useTheme } from "next-themes"
import { LuSun, LuMoon } from "react-icons/lu"

const ChatWidgetSettings = () => {
    const t = useTranslations("ChatRoomPage.widget")
    const currentLocale = useLocale()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { setOpen } = useChatStore()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleLanguageChange = (value: string) => {
        if (value === currentLocale || isPending) return
        const locale = value as Locale
        startTransition(async () => {
            await setUserLocale(locale)
            router.refresh()
        })
    }

    return (
        <div className="relative flex flex-col flex-1 bg-white dark:bg-neutral-900 overflow-hidden">
            {/* Loading Overlay */}
            <AnimatePresence>
                {isPending && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-[1px]"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Spinner size={32} className="text-mystic-purple dark:text-mystic-gold" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`p-4 flex flex-col gap-6 overflow-y-auto transition-all duration-300 ${isPending ? "blur-sm" : ""}`}>
                <section>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">
                        {t("settings_language")}
                    </p>

                    <div className="relative flex w-full max-w-[120px] bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 cursor-pointer border dark:border-neutral-700">
                        <motion.div
                            className="absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-neutral-600 rounded-full shadow-sm border dark:border-neutral-500"
                            animate={{ x: currentLocale === "vi" ? 0 : "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => handleLanguageChange("vi")}
                            disabled={isPending}
                            className="relative z-10 flex-1 flex justify-center items-center py-1 text-sm font-bold disabled:cursor-not-allowed"
                        >
                            <span className={currentLocale === "vi" ? "text-primary-600 dark:text-mystic-gold" : "opacity-40 dark:text-neutral-300"}>VN</span>
                        </button>
                        <button
                            onClick={() => handleLanguageChange("en")}
                            disabled={isPending}
                            className="relative z-10 flex-1 flex justify-center items-center py-1 text-sm font-bold disabled:cursor-not-allowed"
                        >
                            <span className={currentLocale === "en" ? "text-primary-600 dark:text-mystic-gold" : "opacity-40 dark:text-neutral-300"}>EN</span>
                        </button>
                    </div>
                </section>

                {mounted && (
                    <section>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">
                            Giao diện
                        </p>
                        <div className="relative flex w-full max-w-[120px] bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 cursor-pointer border dark:border-neutral-700">
                            <motion.div
                                className="absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-neutral-600 rounded-full shadow-sm border dark:border-neutral-500"
                                animate={{ x: theme === "light" ? 0 : "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => setTheme("light")}
                                className="relative z-10 flex-1 flex justify-center items-center py-1 transition-colors"
                            >
                                <LuSun size={18} className={theme === "light" ? "text-orange-500" : "opacity-40 dark:text-neutral-300"} />
                            </button>
                            <button
                                onClick={() => setTheme("dark")}
                                className="relative z-10 flex-1 flex justify-center items-center py-1 transition-colors"
                            >
                                <LuMoon size={18} className={theme === "dark" ? "text-mystic-gold" : "opacity-40 dark:text-neutral-300"} />
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default ChatWidgetSettings


