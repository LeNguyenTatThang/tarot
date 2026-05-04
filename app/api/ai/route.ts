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
                    Bạn là một chuyên gia về Tarot.

                    Hãy trả lời theo format rõ ràng, dễ đọc, KHÔNG dùng bảng markdown.

                    Format bắt buộc:

                    📌 KẾT QUẢ TRẢI BÀI

                    1. TỔNG QUAN
                    - Viết 3-5 dòng tóm tắt

                    2. Ý NGHĨA TỪNG LÁ 
                    - Mỗi lá:
                    [1] Tên lá (ngược/xuôi)
                    → Ý nghĩa ngắn gọn (2-3 dòng)

                    3. DIỄN BIẾN CHÍNH
                    - Viết dạng bullet (3-5 ý)

                    4. LỜI KHUYÊN
                    - Bullet rõ ràng, dễ áp dụng

                    5. KẾT LUẬN
                    - 2-3 dòng ngắn, dễ nhớ

                    Yêu cầu:
                    - Ngắn gọn, dễ đọc trên mobile
                    - Không dùng bảng
                    - Không quá dài
                    `
        },
        {
          role: "user",
          content: `
          Câu hỏi: ${question}

          Lá bài:
          ${cards
              ?.map(
                (c: { name: string; isReversed: boolean }, i: number) =>
                  `${i + 1}. ${c.name} (${c.isReversed ? "ngược" : "xuôi"})`
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
