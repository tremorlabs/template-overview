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
    <div className="sticky top-0 bg-gray-50">
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
          active={pathname === "/overview" || pathname === "/"}
        >
          <Link href="/overview">Overview</Link>
        </TabNavigationLink>
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/balances"}
        >
          <Link href="/balances">Balances</Link>
        </TabNavigationLink>
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/transactions"}
        >
          <Link href="/transactions">Transactions</Link>
        </TabNavigationLink>
        <TabNavigationLink
          className="inline-flex gap-2"
          asChild
          active={pathname === "/customers"}
        >
          <Link href="/customers">Customers</Link>
        </TabNavigationLink>
      </TabNavigation>
    </div>
  )
}

export { Navigation }
