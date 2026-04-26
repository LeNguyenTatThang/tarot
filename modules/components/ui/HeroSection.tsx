"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

import { useTranslations } from "next-intl"

const TarotCard = dynamic(() => import("@/modules/components/ui/TarotCard"), { ssr: false })
const HeroSection = () => {
  const t = useTranslations("Hero")

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 parallax-section">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="parallax-bg absolute top-0 left-0 w-full h-full">
            <Image
              src="/img/banner.png"
              alt="Hero Background"
              fill
              sizes="100vw"
              className="object-cover object-top brightness-50 transition-opacity duration-500"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left order-1 pr-0 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="font-serif text-mystic-gold text-2xl md:text-3xl tracking-[0.2em] mb-4 glow-text uppercase">
                {t("journey")}
              </h2>
              <h1 className="font-serif text-4xl md:text-8xl font-bold mb-6 gold-text leading-tight whitespace-pre-line">
                {t("title")}
              </h1>
              <p className="max-w-xl mr-auto text-lg md:text-xl text-zinc-300 mb-10 font-sans leading-relaxed">
                {t("description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(107,33,168,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 rounded-full bg-mystic-purple text-white font-bold transition-all glow-text"
                >
                  {t("button_reading")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 rounded-full border border-mystic-gold/50 text-mystic-gold font-bold transition-all"
                >
                  {t("button_meaning")}
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center items-center h-125 order-2">
            <TarotCard />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
