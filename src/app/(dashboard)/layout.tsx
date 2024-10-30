import { Navigation } from "@/components/ui/Navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navigation />
      {/* <div className="px-4 mx-auto max-w-7xl pt-12 sm:px-6">{children}</div> */}
      <div className="px-4 sm:px-6">{children}</div>
    </div>
  )
}
