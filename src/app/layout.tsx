import { RiArrowRightLine } from "@remixicon/react"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import "./globals.css"

export const metadata: Metadata = {
  title: "Overview",
  description: "Dashboard pages to summarize data.",
}

function Banner() {
  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 transition">
      <div className="flex items-center gap-x-1 rounded-full bg-gray-950 p-1 text-sm shadow-xl shadow-black/20 ring-1 ring-white/10">
        <a
          className="group flex items-center gap-0.5 whitespace-nowrap rounded-[20px] bg-gradient-to-b from-white to-gray-200 px-4 py-2 font-semibold text-gray-900 ring-1 ring-inset ring-indigo-400/30 transition"
          href="https://blocks.tremor.so/templates#template-insights"
          target="_blank"
        >
          Get this template
          <RiArrowRightLine className="ml-1 size-[18px] shrink-0" />
        </a>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} min-h-full bg-white antialiased dark:bg-gray-950`}
      >
        <ThemeProvider
          defaultTheme="system"
          disableTransitionOnChange
          attribute="class"
        >
          <div>{children}</div>
          <Banner />
        </ThemeProvider>
      </body>
    </html>
  )
}
