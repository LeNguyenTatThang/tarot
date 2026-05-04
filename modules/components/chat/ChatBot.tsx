import { useEffect, useRef, useCallback, useState } from "react"
import { useTarotStore } from "@/common/stores/tarotStore"
import { useTarotAI } from "@/hooks/useTarotAI"
import useChatStore, { BotMessage } from "@/common/stores/chat"
import ChatInput from "./ChatInput"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

const ChatBot = () => {
    const { question, setQuestion, spreadCards, flipped, reset: resetTarot } = useTarotStore()
    const { messages, setMessages } = useChatStore()
    const t = useTranslations("ChatRoomPage.widget")

    const { loading, result, getReading } = useTarotAI()
    const isCardsReady = spreadCards.length > 0 && flipped.length === spreadCards.length
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [showResultOverlay, setShowResultOverlay] = useState(false)

    const scrollToBottom = useCallback((isSmooth = false) => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: isSmooth ? "smooth" : "auto" })
        }
    }, [])

    useEffect(() => {
        if (!showResultOverlay) {
            scrollToBottom(false)
        }
    }, [messages, loading, showResultOverlay, scrollToBottom])

    const handleResetAll = () => {
        resetTarot()
        setMessages([
            {
                id: "1",
                role: "bot",
                content: "Hệ thống đã được khởi tạo lại. Bạn có thể bắt đầu một trải bài mới ngay bây giờ."
            }
        ])
        setShowResultOverlay(false)
    }

    const handleGetResult = async (q: string) => {
        const botLoadingMsg: BotMessage = {
            id: "loading-" + Date.now(),
            role: "bot",
            content: "Đang kết nối với các vì sao để giải mã những lá bài của bạn... Vui lòng chờ trong giây lát. 🔮"
        }
        setMessages(prev => [...prev, botLoadingMsg])

        await getReading(q, spreadCards)
    }

    const validateMessage = (msg: string) => {
        const cleanMsg = msg.trim()
        if (cleanMsg.length < 5) return false

        const hasVowels = /[aeiouyàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/i.test(cleanMsg)
        if (!hasVowels) return false

        const wordCount = cleanMsg.split(/\s+/).length
        if (wordCount < 2 && cleanMsg.length < 10) return false

        return true
    }

    const handleSendMessage = async (message: string) => {
        const newUserMessage: BotMessage = {
            id: Date.now().toString(),
            role: "user",
            content: message
        }

        setMessages(prev => [...prev, newUserMessage])

        if (!validateMessage(message) && !["xong", "xem", "ok", "được", "rồi"].some(k => message.toLowerCase().includes(k))) {
            setTimeout(() => {
                const botReply: BotMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: "Câu hỏi của bạn hơi ngắn hoặc chưa rõ ý. Để tôi có thể giải mã chính xác nhất, bạn vui lòng đặt câu hỏi cụ thể hơn một chút nhé (ví dụ: 'Tình duyên tháng này của tôi thế nào?')."
                }
                setMessages(prev => [...prev, botReply])
            }, 500)
            return
        }

        setQuestion(message)

        if (spreadCards.length === 0) {
            setTimeout(() => {
                const botReply: BotMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: "Bạn chưa chọn kiểu bài Tarot. Hãy quay lại màn hình chính, chọn một chủ đề (Tình duyên, Công việc...) và rút những lá bài trước nhé!"
                }
                setMessages(prev => [...prev, botReply])
            }, 500)
        } else if (!isCardsReady) {
            setTimeout(() => {
                const botReply: BotMessage = {
                    id: (Date.now() + 1).toString(),
                    role: "bot",
                    content: `Tôi đã nhận được câu hỏi: "${message}". Tuy nhiên, bạn chưa lật hết các lá bài đã chọn. Hãy quay lại lật hết bài để tôi có thể bắt đầu giải mã nhé!`
                }
                setMessages(prev => [...prev, botReply])
            }, 500)
        } else {
            await handleGetResult(message)
        }
    }

    useEffect(() => {
        if (result && !loading) {
            setMessages(prev => prev.filter(m => !m.id.startsWith("loading-")))
            setShowResultOverlay(true)
        }
    }, [result, loading, setMessages])

    return (
        <div className="relative flex flex-col flex-1 bg-neutral-50/50 dark:bg-neutral-900/50 overflow-hidden">
            <div className="flex-1 overflow-y-auto pt-4 p-4 space-y-4 min-h-[235px] custom-scrollbar">
                {messages.map((msg, index) => (
                    <motion.div
                        key={msg.id}
                        initial={index === messages.length - 1 ? { opacity: 0, y: 5 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === "user"
                                ? "bg-primary-600 text-white rounded-tr-none"
                                : "bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 rounded-tl-none border border-neutral-300 dark:border-neutral-700"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-none">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2" />
            </div>

            <AnimatePresence>
                {showResultOverlay && result && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        className="absolute inset-0 z-50 flex flex-col bg-neutral-50 dark:bg-neutral-900"
                    >
                        <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700 bg-mystic-purple/10">
                            <h3 className="font-serif gold-text tracking-wide">🔮 Kết quả giải bài</h3>
                            <button
                                onClick={() => setShowResultOverlay(false)}
                                className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-linear-to-b from-mystic-purple/5 to-transparent text-center">
                            <div className="whitespace-pre-line text-left text-neutral-800 dark:text-zinc-200 leading-relaxed text-base font-sans">
                                {result}
                            </div>
                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    onClick={() => setShowResultOverlay(false)}
                                    className="w-full py-3 rounded-xl bg-linear-to-r from-mystic-purple to-mystic-indigo text-white font-bold tracking-widest shadow-lg border border-mystic-gold/20 hover:scale-[1.02] transition-transform"
                                >
                                    Quay lại chat 💬
                                </button>
                                <button
                                    onClick={handleResetAll}
                                    className="w-full py-2 rounded-xl border border-red-500/50 text-red-500 text-sm font-medium hover:bg-red-500/10 transition-colors"
                                >
                                    Kết thúc & Xóa dữ liệu 🗑️
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showResultOverlay && (
                <div className="p-4 border-t border-neutral-300 dark:border-neutral-700 space-y-2">
                    {spreadCards.length > 0 && (
                        <button
                            onClick={handleResetAll}
                            className="w-full py-1 text-xs text-neutral-500 hover:text-red-500 transition-colors underline"
                        >
                            Làm mới phiên trải bài 🔄
                        </button>
                    )}
                    <ChatInput
                        onSendMessage={handleSendMessage}
                        onCancelReply={() => { }}
                        isWidget={true}
                    />
                </div>
            )}
        </div>
    )
}

export default ChatBot
