import NextTopLoader from "nextjs-toploader"
import { getServerSession } from "next-auth"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import ThemeProviderContext from "@/common/providers/theme"
import NextAuthProvider from "../SessionProvider"
import { ReactNode } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RootLayoutContent({ children, params }: { children: ReactNode; params: any }) {
  const messages = await getMessages()
  const session = await getServerSession()

  return (
    <>
      <NextTopLoader
        color="#fff200ff"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #deee60ff,0 0 5px #ffc800ff"
      />
      <NextIntlClientProvider messages={messages}>
        <NextAuthProvider session={session}>
          <ThemeProviderContext>
           {children}
          </ThemeProviderContext>
        </NextAuthProvider>
      </NextIntlClientProvider>
    </>
  )
}
