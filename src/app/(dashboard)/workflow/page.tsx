"use client"
import { Checkbox } from "@/components/Checkbox"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
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

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(0, Number(event.target.value)), 100)
    setScenarioQuota(value)
  }

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
      <div className="mt-12 rounded-md bg-gray-50 p-6 ring-1 ring-gray-200 dark:ring-gray-800 flex flex-wrap items-start gap-6 w-full">
        {/* @SEV: weird tailwind case when combining input + slider -> had to use hard width value (w-96) -> w-fit, flex-1 etc. does not work that it just wraps around and does not shrink... */}
        <div className="w-full sm:w-96">
          <Label htmlFor="test-quota" className="font-medium">
            Test Quota (%)
          </Label>
          <div className="mt-2 flex items-center gap-4">
            <Slider
              id="test-quota"
              value={[scenarioQuota]}
              onValueChange={([value]) => setScenarioQuota(value)}
              min={0}
              max={100}
              step={5}
              className="w-full sm:max-w-56"
            />
            <Input
              type="number"
              value={scenarioQuota}
              onChange={handleInputChange}
              min={0}
              max={100}
              className="w-20 sm:w-16 [&>input]:py-1"
            />
          </div>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400 dark:text-gray-600">Current: {actualQuota}%</span>
            <span className="text-gray-900 dark:text-gray-50">Scenario: {scenarioQuota}%</span>
          </p>
        </div>
        <div>
          <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">Select departments to include</legend>
          <div className="mt-5 flex flex-wrap gap-6">
            <div className="flex items-center gap-2.5">
              <Checkbox id="sales" name="sales" defaultChecked />
              <Label htmlFor="sales">Sales</Label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox id="marketing" name="marketing" defaultChecked />
              <Label htmlFor="marketing">Marketing</Label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox id="engineering" name="engineering" />
              <Label htmlFor="engineering">Engineering</Label>
            </div>
            <div className="flex items-center gap-2.5">
              <Checkbox id="operations" name="operations" />
              <Label htmlFor="operations">Operations</Label>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-12 overflow-x-scroll p-4">
        <div className="grid min-w-[40rem] grid-cols-5">
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">1. Completed Cases</h2>
            </div>
            <div className="flex justify-center">
              <ProgressCircle
                radius={45}
                strokeWidth={6}
                value={displayData.total_cases}
              >
                <div className="flex flex-col items-center">
                  <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                    {valueFormatter(displayData.total_cases)}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-50">
                    100%
                  </span>
                </div>
              </ProgressCircle>
            </div>
          </div>
          <div className="mt-24 min-w-32">
            <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-700" />
            <div className="mx-auto h-48 w-px border-l border-dashed border-gray-300 dark:border-gray-700" />
            <div className="ml-auto w-1/2 border-t border-dashed border-gray-300 dark:border-gray-700" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">2. Test Results</h2>
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
                      {valueFormatter(displayData.tested_cases)}
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
            <div className="mt-10">
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
                      {valueFormatter(displayData.untested_cases)}
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
            <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-700" />
            <div className="mx-auto mt-0 h-48 w-px border-l border-dashed border-gray-300 dark:border-gray-700" />
            <div className="ml-auto w-1/2 border-t border-dashed border-gray-300 dark:border-gray-700" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">3. Impact</h2>
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
                      {valueFormatter(displayData.error_free_cases)}
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
            <div className="mt-10">
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
                      {valueFormatter(displayData.corrected_cases)}
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
      <Divider className="my-12" />
      <section className="mt-12">
        <h2 className="font-medium text-gray-900 dark:text-gray-50">Impact overview</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative rounded-md px-4 py-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="absolute bg-blue-500 dark:bg-blue-500 h-10 w-1 rounded-r-md inset-x-0 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <div>
              <p className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-500">Total cases</span>
                <span className="text-sm text-gray-500 dark:text-gray-500">current</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">7,345</span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-500">9,793</span>
              </p>
            </div>
          </div>
          <div className="relative rounded-md px-4 py-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="absolute bg-blue-500 dark:bg-blue-500 h-10 w-1 rounded-r-md inset-x-0 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <div>
              <p className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-500">Total saved costs</span>
                <span className="text-sm text-gray-500 dark:text-gray-500">current</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">-$34,340</span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-500">$40,921</span>
              </p>
            </div>
          </div>
          <div className="relative rounded-md px-4 py-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="absolute bg-blue-500 dark:bg-blue-500 h-10 w-1 rounded-r-md inset-x-0 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <div>
              <p className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-500">Total FTE savings</span>
                <span className="text-sm text-gray-500 dark:text-gray-500">current</span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">-32</span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-500">121</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">Cost savings breakdown</h3>
            <ul role="list" className="mt-2 text-sm divide-y divide-gray-200 dark:divide-gray-800">
              <li className="py-3 flex items-center justify-between">
                <span>In 1 year</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span className="text-right font-medium text-gray-900 dark:text-gray-50">-$21,810</span>
                  <span className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                  <span className="bg-emerald-50 py-1 px-1.5 text-xs rounded font-semibold text-right text-emerald-600 dark:text-emerald-400">+10.7%</span>
                </span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <span>in 5 years</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span className="text-right font-medium text-gray-900 dark:text-gray-50">-$350,310</span>
                  <span className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                  <span className="bg-red-50 py-1 px-1.5 text-xs rounded font-semibold text-right text-red-600 dark:text-red-400">+12.1%</span>
                </span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <span>in 10 years</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span className="text-right font-medium text-gray-900 dark:text-gray-50">-$4,345,340</span>
                  <span className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                  <span className="bg-red-50 py-1 px-1.5 text-xs rounded font-semibold text-right text-red-600 dark:text-red-400">+19.4%</span>
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">FTE savings breakdown</h3>
            <ul role="list" className="mt-2 text-sm divide-y divide-gray-200 dark:divide-gray-800">
              <li className="py-3 flex items-center justify-between">
                <span>In 1 year</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span className="text-right font-medium text-gray-900 dark:text-gray-50">-121</span>
                  <span className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                  <span className="bg-emerald-50 py-1 px-1.5 text-xs rounded font-semibold text-right text-emerald-600 dark:text-emerald-400">+10.7%</span>
                </span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <span>in 5 years</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span className="text-right font-medium text-gray-900 dark:text-gray-50">-531</span>
                  <span className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                  <span className="bg-red-50 py-1 px-1.5 text-xs rounded font-semibold text-right text-red-600 dark:text-red-400">+12.1%</span>
                </span>
              </li>
              <li className="py-3 flex items-center justify-between">
                <span>in 10 years</span>
                <span className="flex items-center gap-3 tabular-nums">
                  <span className="text-right font-medium text-gray-900 dark:text-gray-50">-1,203</span>
                  <span className="w-px h-5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
                  <span className="bg-red-50 py-1 px-1.5 text-xs rounded font-semibold text-right text-red-600 dark:text-red-400">+19.4%</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
