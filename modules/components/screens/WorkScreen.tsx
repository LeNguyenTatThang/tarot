"use client"

import { useTarotStore } from "@/common/stores/tarotStore"
import { useEffect } from "react"
import TarotCarousel from "../ui/TarotCarousel"
import Image from "next/image"

const WorkScreen = () => {
  const {
    setType,
  } = useTarotStore()

  useEffect(() => {
    setType("work")
  }, [setType])

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
        <TarotCarousel maxPick={5} />
      </div>
    </div>
  )
}

export default WorkScreen
