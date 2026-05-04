import HomePage from "@/modules/components/screens/Home"

export default async function Home() {
  await new Promise((r) => setTimeout(r, 3000))
  return (
    <>
      <HomePage />
    </>
  )
}
