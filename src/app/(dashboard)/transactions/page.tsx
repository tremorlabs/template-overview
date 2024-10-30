"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { LineChart } from "@/components/LineChart"
import { ProgressCircle } from "@/components/ProgressCircle"
import { TransactionDrawer } from "@/components/ui/TransactionDrawer"
import { DataTable } from "@/components/ui/data-table-transactions/DataTable"
import { columns } from "@/components/ui/data-table-transactions/columns"
import { spending } from "@/data/transactions/spending"
import { transactions } from "@/data/transactions/transactions"
import { RiArrowDownSLine } from "@remixicon/react"
import React from "react"

export default function Transactions() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <main>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Primary account
          </h2>
          <p className="text-sm/6 text-gray-600 dark:text-gray-400">
            Seamless control of your finances with AI-powered support
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          Move money
          {/* @CHRIS: add popover dropdown */}
          <RiArrowDownSLine className="size-5 shrink-0" aria-hidden="true" />
        </Button>
        <TransactionDrawer open={isOpen} onOpenChange={setIsOpen} />
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* --- Card 1 --- */}
        <Card>
          {/* @SEV: challenge <dd> description */}
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Current expenses
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            $4,390.25
          </dd>
          <CategoryBar
            values={[70, 18, 12]}
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
                70.1%
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                  aria-hidden="true"
                />
                <span className="text-sm">Approved</span>
              </div>
            </li>
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                18.3%
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                  aria-hidden="true"
                />
                <span className="text-sm">Open</span>
              </div>
            </li>
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                11.6%
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-sm bg-rose-500 dark:bg-rose-500"
                  aria-hidden="true"
                />
                <span className="text-sm">In audit</span>
              </div>
            </li>
          </ul>
        </Card>
        {/* --- Card 2 --- */}
        <Card>
          {/* @SEV: challenge <dd> description */}
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Budget health
          </dt>
          <div className="mt-4 flex flex-nowrap items-center justify-between gap-y-4">
            <dd className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Transactions within budget</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  90.1%
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Outlier transactions</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  33
                </span>
              </div>
            </dd>

            <ProgressCircle value={62} radius={45} strokeWidth={7} />
          </div>
        </Card>
        {/* --- Card 3 --- */}
        <Card>
          {/* @SEV: challenge <dd> description */}
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Expenses this month
          </dt>
          <div className="mt-4 flex items-center gap-x-8 gap-y-4">
            <dd className="space-y-3 whitespace-nowrap">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Month-to-date</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  $10,573
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm bg-gray-400 dark:bg-gray-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Previous month</span>
                </div>
                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  $3,451
                </span>
              </div>
            </dd>
            <LineChart
              className="h-28"
              data={spending}
              index="date"
              categories={["This month", "Previous month"]}
              colors={["blue", "lightGray"]}
              showTooltip={false}
              valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
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
