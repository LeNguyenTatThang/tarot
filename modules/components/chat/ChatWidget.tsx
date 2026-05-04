import { ChatRoom } from "./ChatRoom"
import ChatBot from "./ChatBot"
import ChatWidgetHeader from "./ChatWidgetHeader"
import ChatWidgetSettings from "./ChatWidgetSettings"
import { AnimatePresence, motion } from "framer-motion"
import useChatStore from "@/common/stores/chat"
import { useSession } from "next-auth/react"
import ChatAuth from "./ChatAuth"
import clsx from "clsx"

const ChatWidget = () => {
    const { activeTab, size } = useChatStore()
    const { data: session } = useSession()

    const renderContent = () => {
        if (!session && (activeTab === "bot" || activeTab === "room")) {
            return <ChatAuth isWidget={true} />
        }

        switch (activeTab) {
            case "bot":
                return <ChatBot />
            case "room":
                return <ChatRoom isWidget={true} />
            case "settings":
                return <ChatWidgetSettings />
            default:
                return <ChatRoom isWidget={true} />
        }
    }

    const sizeClasses = {
        small: "fixed bottom-20 right-4 left-4 sm:left-auto sm:bottom-18 sm:right-6 w-auto sm:w-96 h-[500px] rounded-2xl",
        medium: "fixed bottom-20 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 w-auto sm:w-[600px] h-[80vh] rounded-2xl",
        full: "fixed inset-0 w-full h-full rounded-none"
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                className={clsx(
                    "border bg-neutral-50/90 backdrop-blur-md border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900/90 z-200 overflow-hidden shadow-2xl flex flex-col transition-all duration-300",
                    sizeClasses[size]
                )}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
            >
                <ChatWidgetHeader />
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatWidget
