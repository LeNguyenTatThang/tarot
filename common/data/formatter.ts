
import { TarotSpreadCard } from "../../commom/types/tarot"

const formatCard = (spreadCards: TarotSpreadCard[]) => {
    return spreadCards.map((item, index) => ({
        position: index + 1,
        name: item.card.key.replaceAll("_", " "),
        suit: item.card.suit,
        reverse: item.isReversed
    }))
}

export default formatCard
