import { getServerSession } from "next-auth"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import ThemeProviderContext from "@/common/providers/theme"
import NextAuthProvider from "../SessionProvider"
import { ReactNode } from "react"
import ChatButton from "@/modules/components/chat/ChatButton"
import Preloader from "@/modules/components/ui/Preloader"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RootLayoutContent({ children, params }: { children: ReactNode; params: any }) {
  const messages = await getMessages()
  const session = await getServerSession()

  return (
    <>
      <Preloader />
      <NextIntlClientProvider messages={messages}>
        <NextAuthProvider session={session}>
          <ThemeProviderContext>
            {children}
            <ChatButton />
          </ThemeProviderContext>
        </NextAuthProvider>
      </NextIntlClientProvider>
    </>
  )
}
