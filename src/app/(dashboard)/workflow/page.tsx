"use client"
import { Button } from "@/components/Button"
import { DatePicker } from "@/components/DatePicker"
import { ProgressCircle } from "@/components/ProgressCircle"
import { Slider } from "@/components/Slider"
import { WorkflowStats } from "@/data/workflow/schema"
import { workflowStats } from "@/data/workflow/workflow-data"
import React from "react"

export const getWorkflowData = (days: number = 90): WorkflowStats[] => {
  const today = new Date()

  return workflowStats.slice(0, days).map((stat, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - 1 - index))
    date.setHours(0, 0, 0, 0)

    return {
      ...stat,
      timestamp: date.toISOString(),
    }
  })
}

export default function Workflow() {
  const data = React.useMemo(() => getWorkflowData(90), [])
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

  const selectedData = React.useMemo(() => {
    const targetDate = selectedDate.toISOString().split("T")[0]
    return (
      data.find((entry) => entry.timestamp.split("T")[0] === targetDate) ??
      data[0]
    )
  }, [data, selectedDate])

  const actualQuota = React.useMemo(() => {
    return Math.round(
      (selectedData.tested_cases / selectedData.total_cases) * 100,
    )
  }, [selectedData])

  const [scenarioQuota, setScenarioQuota] = React.useState<number>(actualQuota)

  React.useEffect(() => {
    setScenarioQuota(actualQuota)
  }, [actualQuota])

  const scenarioData = React.useMemo(() => {
    const newTestedCases = Math.round(
      (scenarioQuota / 100) * selectedData.total_cases,
    )
    const newUntestedCases = selectedData.total_cases - newTestedCases

    const originalErrorRatio =
      selectedData.error_free_cases / selectedData.tested_cases
    const newErrorFreeCases = Math.round(newTestedCases * originalErrorRatio)
    const newCorrectedCases = newTestedCases - newErrorFreeCases

    return {
      ...selectedData,
      tested_cases: newTestedCases,
      untested_cases: newUntestedCases,
      error_free_cases: newErrorFreeCases,
      corrected_cases: newCorrectedCases,
    }
  }, [selectedData, scenarioQuota])

  const displayData =
    scenarioQuota === actualQuota ? selectedData : scenarioData

  return (
    <main className="pb-12">
      <div className="flex items-center justify-between border-b pb-6">
        <h1 className="text-2xl font-semibold text-gray-950">Workflow</h1>
      </div>
      <div className="mt-12 flex items-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="test-quota" className="sr-only">
            Test Quota
          </label>
          <Slider
            id="test-quota"
            value={[scenarioQuota]}
            onValueChange={([value]) => setScenarioQuota(value)}
            min={0}
            max={100}
            step={5}
          />
          <div className="flex w-72 items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">Current: {actualQuota}%</span>
            <span>Scenario: {scenarioQuota}%</span>
            <Button
              variant="ghost"
              onClick={() => setScenarioQuota(actualQuota)}
            >
              Reset
            </Button>
          </div>
        </div>
        <DatePicker
          toDate={new Date()}
          fromDate={new Date(data[0].timestamp)}
          value={selectedDate}
          onChange={(date) => setSelectedDate(date ?? new Date())}
          className="w-40"
        />
        {/* <Button variant="secondary" className="group flex gap-2" disabled>
            <RiRefreshLine
              aria-hidden="true"
              className="size-5 shrink-0 transition group-hover:rotate-[25deg] group-active:rotate-90"
            />
            Refresh
          </Button> */}
      </div>
      <section className="mt-12 overflow-x-scroll p-4">
        <div className="grid min-w-[40rem] grid-cols-5">
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap">1. Completed Cases</h2>
            </div>
            <div className="flex justify-center">
              <ProgressCircle
                radius={45}
                strokeWidth={6}
                value={displayData.total_cases}
              >
                <div className="flex flex-col items-center">
                  <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                    {displayData.total_cases}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-50">
                    100%
                  </span>
                </div>
              </ProgressCircle>
            </div>
          </div>
          <div className="mt-24 min-w-32">
            <div className="w-full border-t border-dashed border-gray-300" />
            <div className="mx-auto mt-0 h-36 w-px border-l border-dashed border-gray-300" />
            <div className="ml-auto w-1/2 border-t border-dashed border-gray-300" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap">2. Test Results</h2>
            </div>
            <div>
              <div className="flex justify-center">
                <ProgressCircle
                  radius={45}
                  strokeWidth={6}
                  value={
                    (displayData.tested_cases / displayData.total_cases) * 100
                  }
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {displayData.tested_cases}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-50">
                      {(
                        (displayData.tested_cases / displayData.total_cases) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700">Tested Cases</p>
            </div>
            <div>
              <div className="flex justify-center">
                <ProgressCircle
                  radius={45}
                  strokeWidth={6}
                  value={
                    (displayData.untested_cases / displayData.total_cases) * 100
                  }
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {displayData.untested_cases}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-50">
                      {(
                        (displayData.untested_cases / displayData.total_cases) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700">Untested Cases</p>
            </div>
          </div>
          <div className="mt-24 min-w-32">
            <div className="w-full border-t border-dashed border-gray-300" />
            <div className="mx-auto mt-0 h-36 w-px border-l border-dashed border-gray-300" />
            <div className="ml-auto w-1/2 border-t border-dashed border-gray-300" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap">3. Test Results</h2>
            </div>
            <div>
              <div className="flex justify-center">
                <ProgressCircle
                  variant="success"
                  radius={45}
                  strokeWidth={6}
                  value={
                    (displayData.error_free_cases / displayData.total_cases) *
                    100
                  }
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {displayData.error_free_cases}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-50">
                      {(
                        (displayData.error_free_cases /
                          displayData.total_cases) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700">Error-free Cases</p>
            </div>
            <div>
              <div className="flex justify-center">
                <ProgressCircle
                  variant="error"
                  radius={45}
                  strokeWidth={6}
                  value={
                    (displayData.corrected_cases / displayData.total_cases) *
                    100
                  }
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {displayData.corrected_cases}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-50">
                      {(
                        (displayData.corrected_cases /
                          displayData.total_cases) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700">Corrected Cases</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
