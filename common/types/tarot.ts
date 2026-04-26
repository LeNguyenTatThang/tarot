export type TarotSuit = "major" | "cups" | "pentacles" | "swords" | "wands"

export type TarotCard = {
  id: number
  key: string
  suit: TarotSuit
  number: number | null
  image: string
}

export type TarotSpreadCard = {
  card: TarotCard
  isReversed: boolean
}

export type TarotReading = {
  question?: string
  cards: TarotSpreadCard[]
}
