"use client"

import {
    RiBankCard2Line,
    RiCustomerService2Fill,
    RiExchange2Line,
    RiHome2Line,
} from "@remixicon/react";
  
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation";
import Link from "next/link";

import { usePathname } from "next/navigation";
  
function Navigation() {
    const pathname = usePathname()
    return (
      <div className="min-h-screen">
        <main className="">
  
  
  
  
          <TabNavigation>
            <TabNavigationLink asChild active={pathname === "/overview" || pathname === "/" } >
              <Link href="/overview" className="inline-flex gap-2">
              <RiHome2Line className="size-4 shrink-0" aria-hidden="true" />
              <span>
                Overview
                </span>
              </Link>
            </TabNavigationLink>
            <TabNavigationLink asChild active={pathname === "/balances"} >
              <Link href="/balances" className="inline-flex gap-2">
              <RiBankCard2Line className="size-4 shrink-0" aria-hidden="true" />
              <span>
                Balances
                </span>
              </Link>
            </TabNavigationLink>
            <TabNavigationLink asChild active={pathname === "/transactions"} >
              <Link href="/transactions" className="inline-flex gap-2">
              <RiExchange2Line className="size-4 shrink-0" aria-hidden="true" />
              <span>
                Transactions
                </span>
              </Link>
            </TabNavigationLink>
            <TabNavigationLink asChild active={pathname === "/customers"} >
              <Link href="/customers" className="inline-flex gap-2">
              <RiCustomerService2Fill className="size-4 shrink-0" aria-hidden="true" />
              <span>
                Customers
                </span>
              </Link>
            </TabNavigationLink>
          </TabNavigation>
  
        </main>
      </div>
    );
  }

  export { Navigation };
  