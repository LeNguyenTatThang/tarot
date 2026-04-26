import { ChatRoom } from "./ChatRoom"
import ChatWidgetHeader from "./ChatWidgetHeader"
import ChatWidgetSettings from "./ChatWidgetSettings"
import { AnimatePresence, motion } from "framer-motion"
import useChatStore from "@/common/stores/chat"

const ChatWidget = () => {
    const { isSetting } = useChatStore()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isSetting ? "settings" : "chat"}
                className="fixed bottom-18 right-20 w-80 sm:w-96 rounded-lg border bg-neutral-50/80 backdrop-blur-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900/90 z-40 overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
            >
                {isSetting ? (
                    <ChatWidgetSettings />
                ) : (
                    <>
                        <ChatWidgetHeader />
                        <ChatRoom isWidget={true} />
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatWidget
