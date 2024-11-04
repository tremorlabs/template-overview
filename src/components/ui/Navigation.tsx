"use client"

import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { Logo } from "../../../public/Logo"
import { DropdownUserProfile } from "./UserProfile"

function Navigation() {
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-20 bg-white shadow-sm dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-3">
        <div>
          <span className="sr-only">Your Company</span>
          <Logo className="h-6" />
        </div>
        <div className="flex h-[42px] flex-nowrap gap-2">
          {/* @CHRIS: fundamental design changes */}
          {/* <Notifications /> */}
          <DropdownUserProfile />
        </div>
      </div>
      <TabNavigation className="mt-8">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/support"}
          >
            <Link href="/support">Support</Link>
          </TabNavigationLink>
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/retention"}
          >
            <Link href="/retention">Retention</Link>
          </TabNavigationLink>
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/workflow"}
          >
            <Link href="/workflow">Workflow</Link>
          </TabNavigationLink>
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/agents"}
          >
            <Link href="/agents">Agents</Link>
          </TabNavigationLink>
        </div>
      </TabNavigation>
    </div>
  )
}

export { Navigation }
