"use client"

import { useTransition } from "react"
import { useTranslations, useLocale } from "next-intl"
import { setUserLocale } from "@/services/locale"
import { Locale } from "@/config"
import { useRouter } from "next/navigation"
import useChatStore from "@/common/stores/chat"
import { IoClose } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import { AiOutlineLoading3Quarters as Spinner } from "react-icons/ai"

const ChatWidgetSettings = () => {
    const t = useTranslations("ChatRoomPage.widget")
    const currentLocale = useLocale()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { setOpen } = useChatStore()

    const handleLanguageChange = (value: string) => {
        if (value === currentLocale || isPending) return
        const locale = value as Locale
        startTransition(async () => {
            await setUserLocale(locale)
            router.refresh()
        })
    }

    return (
        <div className="relative flex flex-col h-[400px] bg-white dark:bg-neutral-900 overflow-hidden">
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

            <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
                <h2 className="font-semibold dark:text-neutral-100">{t("settings_title")}</h2>
                <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    <IoClose size={22} className="dark:text-neutral-100" />
                </button>
            </div>

            <div className={`p-4 flex flex-col gap-6 overflow-y-auto transition-all duration-300 ${isPending ? "blur-sm" : ""}`}>
                <section>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">
                        {t("settings_language")}
                    </p>

                    <div className="relative flex w-full max-w-[120px] bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 cursor-pointer">
                        <motion.div
                            className="absolute inset-y-1 w-[calc(50%-4px)] bg-white dark:bg-neutral-700 rounded-full shadow-sm"
                            animate={{ x: currentLocale === "vi" ? 0 : "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => handleLanguageChange("vi")}
                            disabled={isPending}
                            className="relative z-10 flex-1 flex justify-center items-center py-1 text-xl disabled:cursor-not-allowed"
                        >
                            <span className={currentLocale === "vi" ? "opacity-100" : "opacity-40"}>VN</span>
                        </button>
                        <button
                            onClick={() => handleLanguageChange("en")}
                            disabled={isPending}
                            className="relative z-10 flex-1 flex justify-center items-center py-1 text-xl disabled:cursor-not-allowed"
                        >
                            <span className={currentLocale === "en" ? "opacity-100" : "opacity-40"}>EN</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ChatWidgetSettings


