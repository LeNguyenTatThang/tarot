"use client"

import { useState, useEffect } from "react"
import { RiChatSmile2Line as ChatIcon } from "react-icons/ri"
import { RiChatSmile3Line as ChatIconHover } from "react-icons/ri"
import useChatStore from "@/common/stores/chat"
import ChatWidget from "./ChatWidget"
import { useRouter } from "next/navigation"
import useIsMobile from "@/hooks/useIsMobile"
import { useTranslations } from "next-intl"
import { useTarotStore } from "@/common/stores/tarotStore"

const ChatButton = () => {
    const { isOpen, toggleChat, setOpen, setActiveTab } = useChatStore()
    const { spreadCards, flipped } = useTarotStore()
    const [isHover, setIsHover] = useState(false)
    const [hasAutoOpened, setHasAutoOpened] = useState(false)
    const t = useTranslations("ChatRoomPage.widget")

    const router = useRouter()
    const isMobile = useIsMobile()

    useEffect(() => {
        const isFinished = spreadCards.length > 0 && flipped.length === spreadCards.length
        
        if (isFinished && !hasAutoOpened) {
            setOpen(true)
            setActiveTab("bot")
            setHasAutoOpened(true)
        }

        // Reset cờ khi người dùng bắt đầu trải bài mới
        if (spreadCards.length === 0) {
            setHasAutoOpened(false)
        }
    }, [spreadCards, flipped, setOpen, setActiveTab, hasAutoOpened])

    const handleClickChat = () => {
        toggleChat()
    }

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
                <div
                    className="rounded-full border-2 border-neutral-300 bg-linear-to-br from-neutral-300 to-neutral-100 p-3 text-neutral-700 drop-shadow-xl transition duration-300 hover:scale-105 hover:to-neutral-50 active:scale-95 dark:border-neutral-600 dark:from-neutral-700 dark:to-neutral-800 dark:text-neutral-100 hover:dark:to-neutral-900 cursor-pointer"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={handleClickChat}
                    data-umami-event="click_chat_button"
                >
                    {isHover ? <ChatIconHover size={23} /> : <ChatIcon size={23} />}
                </div>
            </div>
            {isOpen && <ChatWidget />}
        </>
    )
}

export default ChatButton
