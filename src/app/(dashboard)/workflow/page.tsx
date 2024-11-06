"use client"
import { Button } from "@/components/Button"
import { CheckboxExclude } from "@/components/Checkbox"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { ProgressCircle } from "@/components/ProgressCircle"
import { Slider } from "@/components/Slider"
import { departments } from "@/data/workflow/schema"
import { workflowStats } from "@/data/workflow/workflow-data"
import { valueFormatter } from "@/lib/formatters"
import { RiResetLeftLine } from "@remixicon/react"
import React from "react"

export default function Workflow() {
  const data = React.useMemo(() => workflowStats, [])

  const [excludedDepartments, setExcludedDepartments] = React.useState<
    Set<string>
  >(new Set())

  const aggregateStats = React.useMemo(() => {
    const selectedStats = data[0].department_stats.filter(
      (dept) => !excludedDepartments.has(dept.department),
    )

    return {
      total_cases: selectedStats.reduce(
        (sum, dept) => sum + dept.total_cases,
        0,
      ),
      tested_cases: selectedStats.reduce(
        (sum, dept) => sum + dept.tested_cases,
        0,
      ),
      untested_cases: selectedStats.reduce(
        (sum, dept) => sum + dept.untested_cases,
        0,
      ),
      error_free_cases: selectedStats.reduce(
        (sum, dept) => sum + dept.error_free_cases,
        0,
      ),
      corrected_cases: selectedStats.reduce(
        (sum, dept) => sum + dept.corrected_cases,
        0,
      ),
    }
  }, [data, excludedDepartments])

  const actualQuota = React.useMemo(() => {
    return aggregateStats.total_cases === 0
      ? 0
      : Math.round(
          (aggregateStats.tested_cases / aggregateStats.total_cases) * 100,
        )
  }, [aggregateStats])

  const [scenarioQuota, setScenarioQuota] = React.useState<number>(actualQuota)

  React.useEffect(() => {
    setScenarioQuota(actualQuota)
  }, [actualQuota])

  const calculatePercentage = (numerator: number, denominator: number) => {
    if (denominator === 0) return 0
    return (numerator / denominator) * 100
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(0, Number(event.target.value)), 100)
    setScenarioQuota(value)
  }

  const scenarioStats = React.useMemo(() => {
    const newTestedCases = Math.round(
      (scenarioQuota / 100) * aggregateStats.total_cases,
    )
    const newUntestedCases = aggregateStats.total_cases - newTestedCases

    const originalErrorRatio =
      aggregateStats.error_free_cases / aggregateStats.tested_cases
    const newErrorFreeCases = Math.round(newTestedCases * originalErrorRatio)
    const newCorrectedCases = newTestedCases - newErrorFreeCases

    return {
      total_cases: aggregateStats.total_cases,
      tested_cases: newTestedCases,
      untested_cases: newUntestedCases,
      error_free_cases: newErrorFreeCases,
      corrected_cases: newCorrectedCases,
    }
  }, [aggregateStats, scenarioQuota])

  const displayStats =
    scenarioQuota === actualQuota ? aggregateStats : scenarioStats

  const handleDepartmentToggle = (department: string) => {
    setExcludedDepartments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(department)) {
        newSet.delete(department)
      } else {
        newSet.add(department)
      }
      return newSet
    })
  }

  const COST_ASSUMPTIONS = {
    testCostPerCase: 50,
    errorCorrectionCost: 200,
    undetectedErrorCost: 800,
    casesPerFTEAnnually: 250,
    expectedErrorRate: 0.15,
  }

  const GROWTH_FACTORS = {
    SAVINGS_BASE: 1.1,
    SAVINGS_ACCELERATION: 1.05,
    FTE_BASE: 1.08,
    FTE_ACCELERATION: 1.03,
  }

  const calculateImpact = (stats: typeof displayStats) => {
    const untested = stats.untested_cases
    const tested = stats.tested_cases
    const corrected = stats.corrected_cases

    const testingCosts = tested * COST_ASSUMPTIONS.testCostPerCase

    const correctionCosts = corrected * COST_ASSUMPTIONS.errorCorrectionCost

    const undetectedErrors = Math.round(
      untested * COST_ASSUMPTIONS.expectedErrorRate,
    )
    const undetectedErrorCosts =
      undetectedErrors * COST_ASSUMPTIONS.undetectedErrorCost

    const baselineErrorCosts = Math.round(
      stats.total_cases *
        COST_ASSUMPTIONS.expectedErrorRate *
        COST_ASSUMPTIONS.undetectedErrorCost,
    )

    const totalCosts = testingCosts + correctionCosts + undetectedErrorCosts

    const savings = baselineErrorCosts - totalCosts

    const testingFTE = tested / COST_ASSUMPTIONS.casesPerFTEAnnually

    const correctionFTE = corrected / (COST_ASSUMPTIONS.casesPerFTEAnnually * 2)

    const preventionFTE =
      (baselineErrorCosts - undetectedErrorCosts) /
      (COST_ASSUMPTIONS.undetectedErrorCost * 100)

    const netFTEImpact = preventionFTE - (testingFTE + correctionFTE)

    return {
      costs: totalCosts,
      savings: savings,
      fteImpact: netFTEImpact,
    }
  }

  const currentImpact = calculateImpact(aggregateStats)
  const scenarioImpact =
    scenarioQuota === actualQuota
      ? { costs: currentImpact.costs, savings: 0, fteImpact: 0 }
      : calculateImpact(displayStats)

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Workflow
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Analyze case testing efficiency and simulate cost impacts across
            departments
          </p>
        </div>
      </div>
      <Divider />
      <div className="mt-8 flex w-full flex-wrap items-start gap-6 rounded-lg bg-gray-50/50 p-6 ring-1 ring-gray-200 dark:bg-[#090E1A] dark:ring-gray-800">
        <div className="w-full sm:w-96">
          <Label
            htmlFor="test-quota"
            className="text-base font-medium sm:text-sm"
          >
            Test Quota (%)
          </Label>
          <div className="mt-2 flex items-center gap-4">
            <Slider
              value={[scenarioQuota]}
              onValueChange={([value]) => setScenarioQuota(value)}
              min={0}
              max={100}
              step={5}
              className="w-full sm:max-w-56"
              disabled={excludedDepartments.size === departments.length}
            />
            <label htmlFor="quota" className="sr-only">
              Scenario Quota (Percent)
            </label>
            <Input
              id="quota"
              type="number"
              value={scenarioQuota}
              onChange={handleInputChange}
              min={0}
              max={100}
              className="w-20 sm:w-16"
              disabled={excludedDepartments.size === departments.length}
            />
            {scenarioQuota !== actualQuota ? (
              <Button
                onClick={() => setScenarioQuota(actualQuota)}
                variant="ghost"
                className="group -ml-2.5 py-2.5 sm:py-2"
              >
                <RiResetLeftLine className="size-5 text-gray-500 transition group-hover:-rotate-45 group-hover:text-gray-700 dark:text-gray-500 group-hover:dark:text-gray-300" />
                <span className="sr-only">Reset</span>
              </Button>
            ) : null}
          </div>
          <p className="mt-1 flex items-center gap-2 text-sm tabular-nums">
            <span className="text-gray-400 dark:text-gray-600">
              Current: {actualQuota}%
            </span>
            <span className="text-gray-900 dark:text-gray-50">
              Scenario: {scenarioQuota}%
            </span>
          </p>
        </div>
        <div>
          <legend className="font-medium text-gray-900 sm:text-sm dark:text-gray-50">
            Select department to exclude
          </legend>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data[0].department_stats.map((dept) => (
              <div key={dept.department} className="flex items-center gap-2.5">
                <CheckboxExclude
                  id={dept.department}
                  checked={excludedDepartments.has(dept.department)}
                  onCheckedChange={() =>
                    handleDepartmentToggle(dept.department)
                  }
                  aria-label={dept.department_label}
                />
                <Label
                  htmlFor={dept.department}
                  className="whitespace-nowrap text-base sm:text-sm"
                >
                  {dept.department_label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative mt-12 overflow-x-scroll p-4">
        {excludedDepartments.size === departments.length ? (
          <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-sm dark:bg-gray-950/30">
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 dark:bg-gray-900">
                You must include at least one department
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => setExcludedDepartments(new Set())}
                >
                  Reset departments
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="relative grid min-w-[40rem] grid-cols-5">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
              1. Completed Cases
            </h2>
            <div className="flex justify-center">
              <ProgressCircle
                radius={45}
                strokeWidth={6}
                value={displayStats.total_cases}
              >
                <div className="flex flex-col items-center">
                  <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                    {valueFormatter(displayStats.total_cases)}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-500">
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
            <h2 className="text-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
              2. Test Results
            </h2>
            <div>
              <div className="flex justify-center">
                <ProgressCircle
                  radius={45}
                  strokeWidth={6}
                  value={calculatePercentage(
                    displayStats.tested_cases,
                    displayStats.total_cases,
                  )}
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {valueFormatter(displayStats.tested_cases)}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500">
                      {calculatePercentage(
                        displayStats.tested_cases,
                        displayStats.total_cases,
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                Tested Cases
              </p>
            </div>
            <div className="mt-10">
              <div className="flex justify-center">
                <ProgressCircle
                  radius={45}
                  strokeWidth={6}
                  value={calculatePercentage(
                    displayStats.untested_cases,
                    displayStats.total_cases,
                  )}
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {valueFormatter(displayStats.untested_cases)}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-500">
                      {(
                        (displayStats.untested_cases /
                          displayStats.total_cases) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                Untested Cases
              </p>
            </div>
          </div>
          <div className="mt-24 min-w-32">
            <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-700" />
            <div className="mx-auto h-48 w-px border-l border-dashed border-gray-300 dark:border-gray-700" />
            <div className="ml-auto w-1/2 border-t border-dashed border-gray-300 dark:border-gray-700" />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                3. Impact
              </h2>
            </div>
            <div>
              <div className="flex justify-center">
                <ProgressCircle
                  variant="success"
                  radius={45}
                  strokeWidth={6}
                  value={calculatePercentage(
                    displayStats.error_free_cases,
                    displayStats.total_cases,
                  )}
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {valueFormatter(displayStats.error_free_cases)}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-500">
                      {calculatePercentage(
                        displayStats.error_free_cases,
                        displayStats.total_cases,
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                Error-free Cases
              </p>
            </div>
            <div className="mt-10">
              <div className="flex justify-center">
                <ProgressCircle
                  variant="error"
                  radius={45}
                  strokeWidth={6}
                  value={calculatePercentage(
                    displayStats.corrected_cases,
                    displayStats.total_cases,
                  )}
                >
                  <div className="flex flex-col items-center">
                    <span className="mt-1 font-medium tabular-nums text-gray-900 dark:text-gray-50">
                      {valueFormatter(displayStats.corrected_cases)}
                    </span>
                    <span className="text-xs font-medium tabular-nums text-gray-500 dark:text-gray-500">
                      {calculatePercentage(
                        displayStats.corrected_cases,
                        displayStats.total_cases,
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </ProgressCircle>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                Corrected Cases
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider className="my-12" />
      <section className="relative mt-12">
        <h2 className="font-medium text-gray-900 dark:text-gray-50">
          Impact overview
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span
              className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
              aria-hidden="true"
            />
            <div>
              <p className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Total cases
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  current
                </span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {valueFormatter(displayStats.total_cases)}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-500">
                  {valueFormatter(aggregateStats.total_cases)}
                </span>
              </p>
            </div>
          </div>

          <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span
              className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
              aria-hidden="true"
            />
            <div>
              <p className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Net cost savings
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  current
                </span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {scenarioQuota === actualQuota
                    ? "No impact"
                    : `$${valueFormatter(Math.round(scenarioImpact.savings))}`}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-500">
                  ${valueFormatter(Math.round(currentImpact.savings))}
                </span>
              </p>
            </div>
          </div>

          <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <span
              className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
              aria-hidden="true"
            />
            <div>
              <p className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  Net FTE impact
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  current
                </span>
              </p>
              <p className="flex items-center justify-between gap-2">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {scenarioQuota === actualQuota
                    ? "No impact"
                    : scenarioImpact.fteImpact.toFixed(1)}
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-500">
                  {currentImpact.fteImpact.toFixed(1)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Cost savings breakdown
            </h3>
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 text-sm dark:divide-gray-800"
            >
              {[1, 5, 10].map((years) => {
                const baseMultiplier = Math.pow(
                  GROWTH_FACTORS.SAVINGS_BASE,
                  years,
                )
                const acceleratedGrowth = Math.pow(
                  GROWTH_FACTORS.SAVINGS_ACCELERATION,
                  years,
                )
                const totalMultiplier =
                  baseMultiplier * acceleratedGrowth * (1 + years * 0.1)

                const currentSavings = currentImpact.savings * totalMultiplier
                const projectedSavings =
                  scenarioQuota === actualQuota
                    ? currentSavings
                    : scenarioImpact.savings * totalMultiplier

                const difference =
                  scenarioQuota === actualQuota
                    ? 0
                    : ((projectedSavings - currentSavings) /
                        Math.abs(currentSavings)) *
                      100 *
                      (1 + years * 0.5)

                return (
                  <li
                    key={years}
                    className="flex items-center justify-between py-3"
                  >
                    <span>
                      In {years} year{years > 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-3 tabular-nums">
                      <span className="text-right font-medium text-gray-900 dark:text-gray-50">
                        {scenarioQuota === actualQuota
                          ? "No impact"
                          : `$${valueFormatter(Math.round(projectedSavings))}`}
                      </span>
                      <span
                        className="h-5 w-px bg-gray-200 dark:bg-gray-800"
                        aria-hidden="true"
                      />
                      <span
                        className={`rounded px-1.5 py-1 text-right text-xs font-semibold ${
                          difference === 0
                            ? "bg-gray-50 text-gray-600 dark:bg-gray-400/10 dark:text-gray-400"
                            : difference > 0
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                              : "bg-red-50 text-red-600 dark:bg-red-400/20 dark:text-red-500"
                        }`}
                      >
                        {difference === 0
                          ? "0.0%"
                          : `${difference > 0 ? "+" : ""}${difference.toFixed(1)}%`}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
              FTE impact breakdown
            </h3>
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 text-sm dark:divide-gray-800"
            >
              {[1, 5, 10].map((years) => {
                const baseMultiplier = Math.pow(GROWTH_FACTORS.FTE_BASE, years)
                const acceleratedGrowth = Math.pow(
                  GROWTH_FACTORS.FTE_ACCELERATION,
                  years,
                )
                const totalMultiplier =
                  baseMultiplier * acceleratedGrowth * (1 + years * 0.1)

                const currentFTE =
                  (currentImpact.fteImpact * totalMultiplier) / 1.4
                const projectedFTE =
                  scenarioQuota === actualQuota
                    ? currentFTE
                    : (scenarioImpact.fteImpact * totalMultiplier) / 1.4

                const difference =
                  scenarioQuota === actualQuota
                    ? 0
                    : (((projectedFTE - currentFTE) / Math.abs(currentFTE)) *
                        100 *
                        (1 + years * 0.5)) /
                      1.4

                return (
                  <li
                    key={years}
                    className="flex items-center justify-between py-3"
                  >
                    <span>
                      In {years} year{years > 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-3 tabular-nums">
                      <span className="text-right font-medium text-gray-900 dark:text-gray-50">
                        {scenarioQuota === actualQuota
                          ? "No impact"
                          : projectedFTE.toFixed(1)}
                      </span>
                      <span
                        className="h-5 w-px bg-gray-200 dark:bg-gray-800"
                        aria-hidden="true"
                      />
                      <span
                        className={`rounded px-1.5 py-1 text-right text-xs font-semibold ${
                          difference === 0
                            ? "bg-gray-50 text-gray-600 dark:bg-gray-400/10 dark:text-gray-400"
                            : difference > 0
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                              : "bg-red-50 text-red-600 dark:bg-red-400/20 dark:text-red-500"
                        }`}
                      >
                        {difference === 0
                          ? "0.0%"
                          : `${difference > 0 ? "+" : ""}${difference.toFixed(1)}%`}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
