"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "@/app/loading.css"

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true)
    const stars = Array.from({ length: 120 })

    useEffect(() => {
        const handleLoad = () => {
            // Chờ thêm một chút để người dùng kịp thấy giao diện đẹp của bạn
            setTimeout(() => {
                setIsLoading(false)
            }, 1500)
        }

        if (document.readyState === "complete") {
            handleLoad()
        } else {
            window.addEventListener("load", handleLoad)
            return () => window.removeEventListener("load", handleLoad)
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] overflow-hidden"
                >
                    <div className="galaxy">
                        {stars.map((_, i) => (
                            <div key={i} className="bg-star"></div>
                        ))}

                        <div className="galaxy-core"></div>

                        <div className="constellation">
                            <span className="c-star"></span>
                            <span className="c-star"></span>
                            <span className="c-star"></span>
                            <span className="c-star"></span>
                            <span className="c-star"></span>
                            <span className="c-star"></span>
                            <span className="c-star"></span>

                            <div className="line l1"></div>
                            <div className="line l2"></div>
                            <div className="line l3"></div>
                            <div className="line l4"></div>
                            <div className="line l5"></div>
                            <div className="line l6"></div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-10"
                        >
                            <h2 className="text-xl font-serif gold-text tracking-[0.3em] uppercase">Tarot AI</h2>
                            <p className="text-mystic-purple/60 text-xs mt-3 font-light tracking-widest italic animate-pulse">
                                Đang kết nối với định mệnh...
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader
