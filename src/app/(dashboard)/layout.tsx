import { Navigation } from "@/components/ui/Navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navigation />
      <div className="mx-auto max-w-7xl pt-12">{children}</div>
    </div>
  )
}
