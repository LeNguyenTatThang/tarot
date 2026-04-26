import { ReactNode } from "react"
import { onestSans } from "@/common/fonts/fonts"
import RootLayoutContent from "./RootLayoutContent"
import "./globals.css"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RootLayout({ children, params }: { children: ReactNode; params: any }) {
  const locale = params?.locale || "en"

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={onestSans.className} suppressHydrationWarning>
        <RootLayoutContent params={params}>{children}</RootLayoutContent>
      </body>
    </html>
  )
}
