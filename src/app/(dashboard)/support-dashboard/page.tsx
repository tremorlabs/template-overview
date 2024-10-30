"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { LineChartSupport } from "@/components/LineChartSupport"
import { ProgressCircle } from "@/components/ProgressCircle"
import { TransactionDrawer } from "@/components/ui/TransactionDrawer"
import { DataTable } from "@/components/ui/data-table-transactions/DataTable"
import { columns } from "@/components/ui/data-table-transactions/columns"
import { transactions } from "@/data/support/transactions"
import { volume } from "@/data/support/volume"
// import { callVolume } from "@/data/support/callVolume"
// import { tickets } from "@/data/support/tickets"
import { RiArrowDownSLine } from "@remixicon/react"
import React from "react"

export default function SupportDashboard() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <main>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Support Dashboard
          </h2>
          <p className="text-sm/6 text-gray-600 dark:text-gray-400">
            Real-time monitoring of support metrics with AI-powered insights
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          Create Ticket
          <RiArrowDownSLine className="size-5 shrink-0" aria-hidden="true" />
        </Button>
        <TransactionDrawer open={isOpen} onOpenChange={setIsOpen} />
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* --- Card 1: Ticket Status --- */}
        <Card>
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Current Tickets
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            247
          </dd>
          <CategoryBar
            values={[82, 13, 5]}
            className="mt-6"
            colors={["blue", "lightGray", "rose"]}
            showLabels={false}
          />
          <ul
            role="list"
            className="mt-4 flex flex-wrap gap-x-10 gap-y-4 text-sm"
          >
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                82%
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                  aria-hidden="true"
                />
                <span className="text-sm">Resolved</span>
              </div>
            </li>
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                13%
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm bg-gray-500 dark:bg-gray-500"
                  aria-hidden="true"
                />
                <span className="text-sm">In Progress</span>
              </div>
            </li>
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                5%
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm bg-rose-500 dark:bg-rose-500"
                  aria-hidden="true"
                />
                <span className="text-sm">Escalated</span>
              </div>
            </li>
          </ul>
        </Card>
        {/* --- Card 2: SLA Metrics --- */}
        <Card>
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            SLA Performance
          </dt>
          <div className="mt-4 flex flex-nowrap items-center justify-between gap-y-4">
            <dd className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-emerald-500 dark:bg-emerald-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Within SLA</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  83.3%
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-rose-500 dark:bg-rose-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm">SLA Breached</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  16.7%
                </span>
              </div>
            </dd>

            <ProgressCircle
              variant="success"
              value={83}
              radius={45}
              strokeWidth={7}
            />
          </div>
        </Card>
        {/* --- Card 3: Call Volume --- */}
        <Card>
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Call Volume Trends
          </dt>
          <div className="mt-4 flex items-center gap-x-8 gap-y-4">
            <dd className="space-y-3 whitespace-nowrap">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Today</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  573
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Yesterday</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  451
                </span>
              </div>
            </dd>
            <LineChartSupport
              className="h-28"
              data={volume}
              index="time"
              categories={["Today", "Yesterday"]}
              colors={["blue", "lightGray"]}
              showTooltip={false}
              valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
              }
              startEndOnly={true}
              showYAxis={false}
              showLegend={false}
            />
          </div>
        </Card>
      </dl>
      <DataTable data={transactions} columns={columns} />
    </main>
  )
}
