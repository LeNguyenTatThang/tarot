"use client"

import { useTarotStore } from "@/common/stores/tarotStore"
import { useState, useEffect } from "react"
import { useTarotAI } from "@/hooks/useTarotAI"
import QuestionSelect from "../ui/QuestionSelect"
import TarotCarousel from "../ui/TarotCarousel"
import ResultModal from "@/modules/components/ui/ResultModal"
import Image from "next/image"

const LoveScreen = () => {
  const [value, setValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  
  const {
    spreadCards,
    flipped,
    setType,
    reset
  } = useTarotStore()

  const { loading, result, getReading } = useTarotAI({
    onSuccess: () => console.log("Reading completed"),
  })

  useEffect(() => {
    setType("love")
  }, [setType])

  const isQuestionSelected = value.trim() !== ""
  const isReady = isQuestionSelected && spreadCards.length > 0 && flipped.length === spreadCards.length

  const handleResult = () => {
    setShowModal(true)
    getReading(value, spreadCards)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    reset()
  }

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/background.png"
          alt="background"
          fill
          quality={75}
          sizes="100vw"
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/60 to-background"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center mt-20">
        <QuestionSelect
          label="Câu hỏi"
          value={value}
          options={[
            "Khi nào tôi có người yêu?",
            "Người yêu tương lai của tôi là người như thế nào?",
            "Mối quan hệ hiện tại của tôi sẽ đi về đâu?",
            "Làm sao để tôi thu hút được đúng người?"
          ]}
          onChange={setValue}
        />
        <TarotCarousel maxPick={4} />
      </div>

      <button
        disabled={!isReady}
        className={`
            fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full shadow-2xl transition-all z-[110]
            ${isReady
            ? "bg-mystic-purple hover:scale-105 hover:shadow-mystic-purple/50"
            : "bg-gray-700 cursor-not-allowed opacity-50"
          }
          `}
        onClick={handleResult}
      >
        Xem kết quả 🔮
      </button>

      <ResultModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="🔮 Giải mã Tình duyên"
        content={result}
        isLoading={loading}
      />
    </div>
  )
}

export default LoveScreen
