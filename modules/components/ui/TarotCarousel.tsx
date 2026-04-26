"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import TarotBack from "@/public/img/back.png"
import { drawCards } from "@/common/data/tarot"
import { TarotSpreadCard } from "@/common/types/tarot"
import { useTarotStore } from "@/common/stores/tarotStore"

type tarotStackProps = {
  maxPick: number
}

const TarotCarousel = ({ maxPick }: tarotStackProps) => {
  const {
    selectedIndexes,
    setSelectedIndexes,
    spreadCards,
    setSpreadCards,
    flipped,
    setFlipped,
    reset
  } = useTarotStore()

  const isDone = selectedIndexes.length >= maxPick

  const handlePick = (index: number) => {
    if (selectedIndexes.includes(index) || isDone) return

    const newSelected = [...selectedIndexes, index]
    setSelectedIndexes(newSelected)

    if (newSelected.length === maxPick) {
      const cards = drawCards(maxPick)
      setSpreadCards(cards)
    }
  }

  const handleFlip = (i: number) => {
    if (!isDone || flipped.includes(i)) return
    setFlipped([...flipped, i])
  }

  const cards = Array.from({ length: 78 })
  const rows = [cards.slice(0, 39), cards.slice(39)]

  return (
    <div className="w-full flex flex-col items-center pt-6 text-white relative">
      {isDone === false &&
        <div className="mb-6 font-serif text-mystic-gold bg-white/5 px-6 py-2 rounded-full border border-white/10">
          Cards Picked: <span className="text-white font-bold">{selectedIndexes.length}</span> / {maxPick}
        </div>
      }

      <AnimatePresence>
        {!isDone && (
          <motion.div
            key="deck"
            exit={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-8 w-full max-w-5xl px-4"
          >
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center h-32 md:h-40">
                {row.map((_, i) => {
                  const index = rowIndex === 0 ? i : i + 39
                  const isSelected = selectedIndexes.includes(index)
                  return (
                    <div
                      key={index}
                      onClick={() => handlePick(index)}
                      className={`cursor-pointer group transition-all ${isSelected ? "opacity-20 grayscale pointer-events-none" : "hover:z-50"}`}
                      style={{ marginLeft: i === 0 ? 0 : -65 }}
                    >
                      <Image
                        src={TarotBack}
                        alt="card"
                        width={80}
                        height={120}
                        draggable={false}
                        className="rounded-lg shadow-lg transition group-hover:-translate-y-4 group-hover:scale-110 border border-white/10"
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex flex-nowrap justify-start md:justify-center gap-4 md:gap-6 mt-10 px-6 pb-6 w-full overflow-x-auto custom-scrollbar transition-all duration-700 ${isDone ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {spreadCards.map((item, i) => {
          const isFlip = flipped.includes(i)

          return (
            <div
              key={i}
              onClick={() => handleFlip(i)}
              className="cursor-pointer relative group"
              style={{ perspective: 1000 }}
            >
              <motion.div
                animate={{ rotateY: isFlip ? 180 : 0 }}
                transition={{ duration: 0.7, ease: "backOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-30 h-45 md:w-37/5 md:h-55"
              >
                <div
                  className="absolute inset-0 z-10"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={TarotBack}
                    alt="back"
                    fill
                    className="rounded-xl shadow-2xl border-2 border-mystic-gold/20 object-cover"
                  />
                </div>

                <div
                  className="absolute inset-0"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={item.card.image}
                    alt={item.card.key}
                    fill
                    className={`rounded-xl shadow-2xl border-2 border-mystic-gold/40 object-cover ${item.isReversed ? "rotate-180" : ""}`}
                  />
                </div>
              </motion.div>

              <div className="absolute top-0 -right-3 w-6 h-6 bg-mystic-purple border border-mystic-gold/50 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-20 transition-transform group-hover:scale-110">
                {i + 1}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TarotCarousel
