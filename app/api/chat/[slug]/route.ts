import { NextResponse } from "next/server"
import { createClient } from "@/common/utils/server"

export async function DELETE(req: Request, context: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug: id } = await context.params

  try {
    await supabase.from("tarot_messages").delete().eq("id", id)

    return NextResponse.json("Data saved successfully", { status: 200 })

  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
