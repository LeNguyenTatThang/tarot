import { create } from 'zustand'
import { persist } from "zustand/middleware"
import { TarotSpreadCard } from '@/common/types/tarot'

type TarotType = "love" | "study" | "health" | "work" | "finance"

type TarotData = {
    question: string
    selectedIndexes: number[]
    spreadCards: TarotSpreadCard[]
    flipped: number[]
}

type TarotState = TarotData & {
    type: TarotType
    history: Record<string, TarotData>

    setType: (type: TarotType) => void
    setQuestion: (question: string) => void
    setSelectedIndexes: (selectedIndexes: number[]) => void
    setSpreadCards: (spreadCards: TarotSpreadCard[]) => void
    setFlipped: (flipped: number[]) => void
    reset: () => void
}

const initialData: TarotData = {
    question: "",
    selectedIndexes: [],
    spreadCards: [],
    flipped: [],
}

export const useTarotStore = create<TarotState>()(
    persist(
        (set, get) => ({
            type: "love",
            ...initialData,
            history: {},

            setType: (newType) => {
                const { type, question, selectedIndexes, spreadCards, flipped, history } = get()
                
                // Save current state to history before switching
                const updatedHistory = {
                    ...history,
                    [type]: { question, selectedIndexes, spreadCards, flipped }
                }

                // Load new state from history or use initial data
                const nextData = updatedHistory[newType] || initialData

                set({ 
                    type: newType, 
                    history: updatedHistory,
                    ...nextData
                })
            },

            setQuestion: (question) => set({ question }),
            setSelectedIndexes: (selectedIndexes) => set({ selectedIndexes }),
            setSpreadCards: (spreadCards) => set({ spreadCards }),
            setFlipped: (flipped) => set({ flipped }),
            reset: () => {
                const { type, history } = get()
                set({ 
                    ...initialData,
                    history: {
                        ...history,
                        [type]: initialData
                    }
                })
            }
        }),
        {
            name: "tarot-store-v2" // Äá»•i tÃªn Ä‘á»ƒ trÃ¡nh xung Ä‘á»™t vá»›i dá»¯ liá»‡u cÅ©
        }
    )
)
