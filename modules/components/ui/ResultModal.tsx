"use client"

import { motion, AnimatePresence } from "framer-motion"
import { IoClose } from "react-icons/io5"
import { useTranslations } from "next-intl"

interface ResultModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    content: string
    isLoading: boolean
}

const ResultModal = ({ isOpen, onClose, title, content, isLoading }: ResultModalProps) => {
    const t = useTranslations("ChatRoomPage.widget") 

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl border border-mystic-gold/30 bg-[#0a0515] shadow-[0_0_50px_rgba(107,33,168,0.3)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-mystic-gold/10">
                            <h2 className="text-2xl font-serif gold-text tracking-wide">
                                {title || "Kết quả trả lời"}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors text-mystic-gold"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar min-h-50">
                            {isLoading && !content ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
                                    <motion.div
                                        animate={{ 
                                            rotate: 360,
                                            scale: [1, 1.1, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="w-16 h-16 border-2 border-mystic-gold border-t-transparent rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                    />
                                    <p className="text-mystic-gold/80 animate-pulse font-serif tracking-widest">Đang giải mã thông điệp...</p>
                                </div>
                            ) : (
                                <div className="prose prose-invert max-w-none">
                                    <div className="whitespace-pre-line text-zinc-200 leading-8 text-lg font-sans">
                                        {content}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-mystic-gold/10 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212,175,55,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-10 py-3 rounded-full bg-linear-to-r from-mystic-purple to-mystic-indigo text-white font-bold tracking-widest shadow-lg border border-mystic-gold/20"
                            >
                                Đóng
                            </motion.button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-mystic-gold to-transparent opacity-50" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-mystic-gold to-transparent opacity-50" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ResultModal
