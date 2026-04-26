import { TarotCard, TarotSuit, TarotSpreadCard } from "@/common/types/tarot"

// ===== Major Arcana =====
const majorKeys = [
  "the_fool","the_magician","the_high_priestess","the_empress",
  "the_emperor","the_hierophant","the_lovers","the_chariot",
  "strength","the_hermit","wheel_of_fortune","justice",
  "the_hanged_man","death","temperance","the_devil",
  "the_tower","the_star","the_moon","the_sun",
  "judgement","the_world"
]

export const majorArcana: TarotCard[] = majorKeys.map((key, i) => ({
  id: i,
  key,
  suit: "major",
  number: i,
  image: `/tarot/major/${key}.jpg`
}))

// ===== Minor Arcana =====
const suits: TarotSuit[] = ["cups", "pentacles", "swords", "wands"]

const ranks = [
  "ace","two","three","four","five",
  "six","seven","eight","nine","ten",
  "page","knight","queen","king"
]

export const minorArcana: TarotCard[] = suits.flatMap((suit, suitIndex) =>
  ranks.map((rank, i) => ({
    id: 100 + suitIndex * 20 + i,
    key: `${rank}_of_${suit}`,
    suit,
    number: i + 1,
    image: `/tarot/${suit}/${rank}.jpg`
  }))
)

// ===== Full Deck =====
export const tarotDeck: TarotCard[] = [
  ...majorArcana,
  ...minorArcana
]

// ===== Shuffle =====
export const shuffleDeck = (deck: TarotCard[]) => {
  return [...deck].sort(() => Math.random() - 0.5)
}

// ===== Draw Cards =====
export const drawCards = (count: number): TarotSpreadCard[] => {
  const shuffled = shuffleDeck(tarotDeck)

  return shuffled.slice(0, count).map(card => ({
    card,
    isReversed: Math.random() < 0.3
  }))
}
