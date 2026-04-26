"use client"

import { useState, useCallback } from "react"
import { TarotSpreadCard } from "@/common/types/tarot"

interface UseTarotAIProps {
    onSuccess?: (result: string) => void
    onError?: (error: any) => void
}

export const useTarotAI = (props?: UseTarotAIProps) => {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")

    const getReading = useCallback(async (question: string, spreadCards: TarotSpreadCard[]) => {
        const payload = {
            question: question,
            cards: spreadCards.map((item) => ({
                name: item.card.key.replaceAll("_", " "),
                isReversed: item.isReversed
            }))
        }

        setLoading(true)
        setResult("")

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Failed to fetch AI reading")

            const reader = res.body?.getReader()
            const decoder = new TextDecoder()

            let done = false
            let accumulatedResult = ""

            while (!done) {
                const { value, done: doneReading } = await reader!.read()
                done = doneReading

                const chunk = decoder.decode(value || new Uint8Array())
                accumulatedResult += chunk
                setResult((prev) => prev + chunk)
            }

            props?.onSuccess?.(accumulatedResult)
        } catch (error) {
            console.error("AI Error:", error)
            const errorMessage = "Đã có lỗi xảy ra khi giải bài. Vui lòng thử lại sau."
            setResult(errorMessage)
            props?.onError?.(error)
        } finally {
            setLoading(false)
        }
    }, [props])

    return {
        loading,
        result,
        getReading,
        setResult
    }
}
