import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

const Final = () => {
  const t = useTranslations("Final")

  return (
    <section className="py-16 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="reveal-item glass-morphism rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 blur-sm">
            <Image src="/img/image3.png" alt="CTA BG" fill className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-7xl gold-text mb-8">{t("title")}</h2>
            <p className="max-w-2xl mx-auto text-zinc-300 text-xl mb-12 leading-relaxed">
              {t("description")}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-6 rounded-full bg-mystic-gold text-black font-bold text-xl hover:bg-white transition-all duration-500 shadow-xl"
            >
              {t("button")}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Final
