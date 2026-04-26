import { useTranslations } from "next-intl"
import Image from "next/image"

const Works = () => {
  const t = useTranslations("Works")

  return (
    <section className="py-32 relative overflow-hidden section-fade">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/image2.png"
          alt="Tarot Scene"
          fill
          className="object-cover opacity-20 scale-110 blur-sm"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="font-serif text-4xl md:text-6xl gold-text mb-12 reveal-item">{t("title")}</h2>
            <div className="space-y-12">
              {[
                { step: "01", title: t("step1.title"), desc: t("step1.desc") },
                { step: "02", title: t("step2.title"), desc: t("step2.desc") },
                { step: "03", title: t("step3.title"), desc: t("step3.desc") },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start group reveal-item">
                  <span className="font-serif text-5xl text-mystic-purple/30 group-hover:text-mystic-purple transition-colors duration-500">{item.step}</span>
                  <div className="pt-2">
                    <h4 className="font-serif text-2xl text-mystic-gold mb-3 group-hover:glow-text transition-all">{item.title}</h4>
                    <p className="text-zinc-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative reveal-item">
            <div className="relative h-150 w-full rounded-4xl overflow-hidden border border-mystic-gold/20 shadow-[0_0_50px_rgba(107,33,168,0.3)]">
              <Image
                src="/img/image2.png"
                alt="Tarot Scene Detail"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Works
