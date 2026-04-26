"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface TooltipProps {
    title: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right"
}

const Tooltip = ({ title, children, position = "top" }: TooltipProps) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false)

    const handleMouseEnter = () => setTooltipVisible(true)
    const handleMouseLeave = () => setTooltipVisible(false)

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2"
    }

    const tooltipVariants = {
        hidden: { 
            opacity: 0, 
            y: position === "top" ? 5 : position === "bottom" ? -5 : 0,
            x: position === "left" ? 5 : position === "right" ? -5 : 0
        },
        visible: { opacity: 1, y: 0, x: 0 }
    }

    return (
        <div className="relative inline-block">
            <div
                className="tooltip-container relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {isTooltipVisible && (
                <motion.div
                    className={`absolute ${positionClasses[position]} hidden w-max max-w-xs rounded bg-neutral-800/90 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-white lg:block z-9999 shadow-lg`}
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {title}
                </motion.div>
            )}
        </div>
    )
}

export default Tooltip
