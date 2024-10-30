"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { Logo } from "../../../public/Logo"
import { Notifications } from "./Notifications"
import { DropdownUserProfile } from "./UserProfile"

function Navigation() {
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 pt-3">
        <Logo className="h-6" />
        <div className="flex flex-nowrap gap-2">
          <Notifications />
          <DropdownUserProfile />
        </div>
      </div>
      <TabNavigation className="mt-8 overflow-x-auto px-6">
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/transactions" || pathname === "/"}
        >
          <Link href="/transactions">Transactions</Link>
        </TabNavigationLink>
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/case-analysis" || pathname === "/"}
        >
          <Link href="/case-analysis">Case Analysis</Link>
        </TabNavigationLink>
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/heatmap"}
        >
          <Link href="/heatmap">Heatmap</Link>
        </TabNavigationLink>
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/call-agents"}
        >
          <Link href="/call-agents">Call Agents</Link>
        </TabNavigationLink>
      </TabNavigation>
    </div>
  )
}

export { Navigation }
