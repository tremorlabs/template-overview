"use client"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContentFull,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"

import { Button } from "@/components/Button"
import { cohorts } from "@/data/retention/cohorts"
import {
  ActivitySummary,
  ChannelDistribution,
  CohortData,
  CohortRetentionData,
  PerformanceMetrics,
  SatisfactionMetrics,
  TopIssue,
} from "@/data/retention/schema"
import { cx, focusRing } from "@/lib/utils"
import { RiCloseLine, RiExpandDiagonalLine } from "@remixicon/react"
import { useState } from "react"

const colorClasses = [
  "bg-blue-50 dark:bg-blue-950",
  "bg-blue-100 dark:bg-blue-900",
  "bg-blue-200 dark:bg-blue-800",
  "bg-blue-300 dark:bg-blue-700",
  "bg-blue-400 dark:bg-blue-600",
  "bg-blue-500 dark:bg-blue-500",
  "bg-blue-600 dark:bg-blue-400",
  "bg-blue-700 dark:bg-blue-300",
  "bg-blue-800 dark:bg-blue-200",
]

const getBackgroundColor = (
  value: number,
  minValue: number,
  maxValue: number,
) => {
  const normalizedValue = (value - minValue) / (maxValue - minValue)
  const index = Math.min(
    Math.floor(normalizedValue * colorClasses.length),
    colorClasses.length - 1,
  )
  return colorClasses[index]
}

const getTextColor = (value: number, minValue: number, maxValue: number) => {
  return (value - minValue) / (maxValue - minValue) > 0.6
    ? "text-white dark:text-white"
    : "text-gray-900 dark:text-gray-50"
}

interface CohortDetailsDialogProps {
  cohort: CohortData | null
  cohortKey: string | null
  isOpen: boolean
  onClose: () => void
}

const CohortDetailsDialog = ({
  cohort,
  cohortKey,
  isOpen,
  onClose,
}: CohortDetailsDialogProps) => {
  if (!cohort) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentFull className="fixed inset-4 mx-auto flex w-[95vw] flex-col overflow-hidden rounded-lg border bg-white p-0 shadow-lg sm:max-w-3xl">
        <DialogHeader className="flex-none border-b px-6 py-4">
          <DialogTitle className="text-lg font-semibold">
            Cohort Details
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm/6">
            Detailed metrics for cohort starting {cohortKey} with {cohort.size}{" "}
            initial customers
          </DialogDescription>
          <DialogClose asChild>
            <Button
              className="absolute right-4 top-4 p-2 !text-gray-400 hover:text-gray-500 dark:!text-gray-600 hover:dark:text-gray-500"
              variant="ghost"
            >
              <RiCloseLine className="size-5 shrink-0" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <DialogBody className="flex-1 overflow-y-auto px-6">
          <div className="space-y-6">
            {/* Activity Metrics */}
            <section>
              <h3 className="mb-3 font-medium text-gray-900 dark:text-gray-50">
                Activity Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(
                  cohort.summary.activity as Record<
                    keyof ActivitySummary,
                    number
                  >,
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
                  >
                    <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium">
                      {value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Satisfaction Metrics */}
            <section>
              <h3 className="mb-3 font-medium text-gray-900 dark:text-gray-50">
                Customer Satisfaction
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(
                  cohort.summary.satisfaction as Record<
                    keyof SatisfactionMetrics,
                    number
                  >,
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
                  >
                    <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium">
                      {key.includes("score")
                        ? `${value}%`
                        : value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Performance Metrics */}
            <section>
              <h3 className="mb-3 font-medium text-gray-900 dark:text-gray-50">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(
                  cohort.summary.performance as Record<
                    keyof PerformanceMetrics,
                    number
                  >,
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
                  >
                    <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-medium">
                      {key.includes("rate")
                        ? `${(value * 100).toFixed(1)}%`
                        : `${value} mins`}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Issues */}
            <section>
              <h3 className="mb-3 font-medium text-gray-900 dark:text-gray-50">
                Top Issues
              </h3>
              <div className="space-y-3">
                {cohort.summary.top_issues.map(
                  (issue: TopIssue, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{issue.category}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {issue.count} tickets
                        </span>
                      </div>
                      <div className="mt-1 h-2 rounded bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded bg-blue-500"
                          style={{ width: `${issue.resolution_rate * 100}%` }}
                        />
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {(issue.resolution_rate * 100).toFixed(1)}% resolved
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>

            {/* Channel Distribution */}
            <section>
              <h3 className="mb-3 font-medium text-gray-900 dark:text-gray-50">
                Channel Distribution
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(
                  cohort.summary.channels as Record<
                    keyof ChannelDistribution,
                    number
                  >,
                ).map(([channel, value]) => (
                  <div
                    key={channel}
                    className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800/50"
                  >
                    <span className="mb-1 block text-sm capitalize text-gray-600 dark:text-gray-400">
                      {channel}
                    </span>
                    <span className="block text-lg font-medium">{value}%</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DialogBody>
        <DialogFooter className="flex-none border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContentFull>
    </Dialog>
  )
}

export default function CohortRetention() {
  const [selectedCohort, setSelectedCohort] = useState<CohortData | null>(null)
  const [selectedCohortKey, setSelectedCohortKey] = useState<string | null>(
    null,
  )

  const cohortEntries = Object.entries(cohorts as CohortRetentionData)
  const weeksCount = cohortEntries[0]?.[1].weeks.length ?? 0
  const weeks = Array.from({ length: weeksCount }, (_, i) => i)

  return (
    <main className="mt-6">
      <div className="flex items-center justify-between border-b pb-6">
        <h1 className="text-2xl font-semibold text-gray-950">
          Cohort Retention
        </h1>
      </div>
      <section className="mt-12">
        <TableRoot className="overflow-scroll">
          <Table className="border-none">
            <TableHead>
              <TableRow>
                <TableHeaderCell className="sticky left-0 top-0 z-10 min-w-40 border-transparent bg-white p-px dark:border-transparent dark:bg-gray-900">
                  <span className="block">Cohort</span>
                  <span className="block font-normal text-gray-500 dark:text-gray-500">
                    Initial customers
                  </span>
                </TableHeaderCell>
                {weeks.map((week) => (
                  <TableHeaderCell key={week} className="border-none">
                    Week {week}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="divide-none">
              {cohortEntries.map(
                ([cohortKey, cohortData]: [string, CohortData]) => (
                  <TableRow key={cohortKey} className="h-full">
                    <TableCell className="sticky left-0 z-10 h-full bg-white p-0 sm:min-w-56 dark:bg-gray-900">
                      <button
                        className={cx(
                          "group relative -ml-2 h-full w-full rounded pl-2 text-left transition hover:bg-gray-100 focus-visible:bg-gray-100",
                          focusRing,
                        )}
                        onClick={() => {
                          setSelectedCohort(cohortData)
                          setSelectedCohortKey(cohortKey)
                        }}
                      >
                        <RiExpandDiagonalLine className="absolute right-4 top-4 size-5 shrink-0 text-gray-500/0 transition group-hover:text-gray-500 group-focus-visible:text-gray-500" />
                        <span className="block text-sm font-medium text-gray-900 dark:text-gray-50">
                          {cohortKey}
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-500">
                          {cohortData.size} customers
                        </span>
                      </button>
                    </TableCell>
                    {cohortData.weeks.map((weekData, weekIndex) => (
                      <TableCell
                        key={weekIndex}
                        className="h-full min-w-24 p-px"
                      >
                        {weekData === null ? (
                          <div
                            className={cx(
                              "flex h-full flex-col justify-center rounded border border-dashed bg-gray-50 px-3.5 py-3 text-gray-200",
                            )}
                          >
                            <span className="h-4 w-9 rounded-sm bg-gray-100" />
                            <span className="mt-0.5 h-4 w-6 rounded-sm bg-gray-100" />
                          </div>
                        ) : (
                          <div
                            className={cx(
                              "flex h-full flex-col justify-center rounded px-3.5 py-3",
                              getBackgroundColor(weekData.percentage, 0, 100),
                              getTextColor(weekData.percentage, 0, 100),
                            )}
                          >
                            <span className="block text-sm font-semibold">
                              {weekData.percentage.toFixed(1)}%
                            </span>
                            <span
                              className={cx(
                                "mt-0.5 block text-sm",
                                getTextColor(weekData.percentage, 0, 100),
                              )}
                            >
                              {weekData.count}
                            </span>
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableRoot>
      </section>

      <CohortDetailsDialog
        cohort={selectedCohort}
        cohortKey={selectedCohortKey}
        isOpen={!!selectedCohort}
        onClose={() => {
          setSelectedCohort(null)
          setSelectedCohortKey(null)
        }}
      />
    </main>
  )
}
