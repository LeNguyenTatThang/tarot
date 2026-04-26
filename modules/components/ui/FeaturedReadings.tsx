import { useTranslations } from "next-intl"
import LoveScreen from "../screens/LoveScreen"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Screen =
  | "home"
  | "love"
  | "health"
  | "work"
  | "finance"

const TarotCard = dynamic(() => import("@/modules/components/ui/TarotCard"), {
  ssr: false,
})

const FeaturedReading = () => {
  const router = useRouter()
  const t = useTranslations("Featured")

  const featuredCards: {
    title: string
    desc: string
    route: string
    screen: Screen
  }[] = [
      {
        title: t("love.title"),
        desc: t("love.desc"),
        route: "/tarot-love",
        screen: "love",
      },
      {
        title: t("work.title"),
        desc: t("work.desc"),
        route: "/tarot-work",
        screen: "work",
      },
      {
        title: t("finance.title"),
        desc: t("finance.desc"),
        route: "/tarot-finance",
        screen: "finance",
      },
      {
        title: t("health.title"),
        desc: t("health.desc"),
        route: "/tarot-health",
        screen: "health",
      },
    ]

  return (
    <section className="py-32 relative parallax-section overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="parallax-bg absolute top-0 left-0 w-full h-full">
          <Image
            src="/img/back4.png"
            alt="Featured Background"
            fill
            className="object-cover brightness-[0.4]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12">
          <div className="lg:w-2/3 text-center lg:text-left reveal-item">
            <h2 className="font-serif text-3xl md:text-6xl gold-text mb-6">
              {t("title")}
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {t("description")}
            </p>
            <div className="w-32 h-1 bg-mystic-gold mt-8 rounded-full opacity-50 mx-auto lg:mx-0"></div>
          </div>

          <div className="lg:w-1/3 flex justify-center reveal-item">
            <div className="scale-75 origin-center">
              <TarotCard />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCards.map((card, i) => (
            <div
              key={card.screen}
              onClick={() => router.push(card.route)}
              className="reveal-item glass-morphism p-10 rounded-3xl text-center group cursor-pointer transition-all border-white/5 hover:border-mystic-gold/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <Image
                  src="/img/back1.png"
                  alt="Card BG"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-8 bg-mystic-purple/20 rounded-xl flex items-center justify-center group-hover:bg-mystic-purple/40 transition-all duration-500 rotate-45 group-hover:rotate-0 border border-mystic-gold/20">
                  <span className="text-mystic-gold text-3xl font-serif -rotate-45 group-hover:rotate-0 transition-transform">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-mystic-gold mb-4 group-hover:glow-text transition-all">
                  {card.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed">{card.desc}</p>

                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-mystic-gold text-sm font-bold uppercase tracking-widest border-b border-mystic-gold/30 pb-1">
                    {t("start_now")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedReading
