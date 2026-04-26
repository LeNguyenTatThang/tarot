import { NextResponse } from "next/server"
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY
})

export const POST = async (req: Request) => {
  try {
    const { question, cards } = await req.json()
    console.log(question, cards)

    const stream = await client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        {
          role: "system",
          content: `
                    Báº¡n lÃ  chuyÃªn gia tarot.

                    HÃ£y tráº£ lá»i theo format rÃµ rÃ ng, dá»… Ä‘á»c, KHÃ”NG dÃ¹ng báº£ng markdown.

                    Format báº¯t buá»™c:

                    ðŸ”® Káº¾T QUáº¢ TRáº¢I BÃ€I

                    1. Tá»”NG QUAN
                    - Viáº¿t 3-5 dÃ²ng tÃ³m táº¯t

                    2. Ã NGHÄ¨A Tá»ªNG LÃ
                    - Má»—i lÃ¡:
                    [1] TÃªn lÃ¡ (xuÃ´i/ngÆ°á»£c)
                    â†’ Ã nghÄ©a ngáº¯n gá»n (2-3 dÃ²ng)

                    3. DIá»„N BIáº¾N CHÃNH
                    - Viáº¿t dáº¡ng bullet (3-5 Ã½)

                    4. Lá»œI KHUYÃŠN
                    - Bullet rÃµ rÃ ng, dá»… Ã¡p dá»¥ng

                    5. Káº¾T LUáº¬N
                    - 2-3 dÃ²ng ngáº¯n, dá»… nhá»›

                    YÃªu cáº§u:
                    - Ngáº¯n gá»n, dá»… Ä‘á»c trÃªn mobile
                    - KhÃ´ng dÃ¹ng báº£ng
                    - KhÃ´ng quÃ¡ dÃ i
                    `
        },
        {
          role: "user",
          content: `
          CÃ¢u há»i: ${question}

          LÃ¡ bÃ i:
          ${cards
            ?.map(
              (c: { name: string; isReversed: boolean }, i: number) =>
                `${i + 1}. ${c.name} (${c.isReversed ? "ngÆ°á»£c" : "xuÃ´i"})`
            )
            .join("\n")}
          `
        }
      ],
      stream: true
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content
          if (content) {
            controller.enqueue(encoder.encode(content))
          }
        }
        controller.close()
      }
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream"
      }
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
