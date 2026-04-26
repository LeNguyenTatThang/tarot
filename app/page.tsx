import HomePage from "@/modules/components/screens/Home"
import ChatButton from "@/modules/components/chat/ChatButton"

export default async function Home() {
  await new Promise((r) => setTimeout(r, 3000))
  return (
    <>
      <HomePage />
      <ChatButton />
    </>
  )
}
