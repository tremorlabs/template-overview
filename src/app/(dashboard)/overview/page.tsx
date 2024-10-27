"use client"

import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { LineChart } from "@/components/LineChart"
import { ProgressCircle } from "@/components/ProgressCircle"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"

const data = [
    {
        date: "Jan 23",
        SolarPanels: 2890,
        Inverters: 2338,
    },
    {
        date: "Feb 23",
        SolarPanels: 2756,
        Inverters: 2103,
    },
    {
        date: "Mar 23",
        SolarPanels: 3322,
        Inverters: 2194,
    },
    {
        date: "Apr 23",
        SolarPanels: 3470,
        Inverters: 2108,
    },
    {
        date: "May 23",
        SolarPanels: 3475,
        Inverters: 1812,
    },
    {
        date: "Jun 23",
        SolarPanels: 3129,
        Inverters: 1726,
    },
    {
        date: "Jul 23",
        SolarPanels: 3490,
        Inverters: 1982,
    },
    {
        date: "Aug 23",
        SolarPanels: 2903,
        Inverters: 2012,
    },
    {
        date: "Sep 23",
        SolarPanels: 2643,
        Inverters: 2342,
    },
    {
        date: "Oct 23",
        SolarPanels: 2837,
        Inverters: 2473,
    },
    {
        date: "Nov 23",
        SolarPanels: 2954,
        Inverters: 3848,
    },
    {
        date: "Dec 23",
        SolarPanels: 3239,
        Inverters: 3736,
    },
]


export default function Home() {
    return (
        <>
            {/* @chris: only for video purposes */}
            {/* <main className="px-4 sm:px-6 pb-32 lg:px-20"> */}
            <>
                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* --- Card 1 --- */}
                    <Card>
                        {/* add other dd description */}
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Response time</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">2min 3s</dd>
                        <CategoryBar
                            values={[70, 18, 12]}
                            className="mt-3"
                            colors={["blue", "gray", "rose"]}
                        />
                        <ul role="list" className="mt-4 flex flex-wrap gap-y-4 gap-x-10 text-sm">
                            <li>
                                <span className="text-base font-semibold text-gray-900 dark:text-gray-50">70.1%</span>
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 shrink-0 bg-blue-500 rounded-sm" aria-hidden="true" />
                                    <span className="text-sm">Satisfied</span>
                                </div>
                            </li>
                            <li>
                                <span className="text-base font-semibold text-gray-900 dark:text-gray-50">18.3%</span>
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 shrink-0 bg-gray-400 rounded-sm" aria-hidden="true" />
                                    <span className="text-sm">Neutral</span>
                                </div>
                            </li>
                            <li>
                                <span className="text-base font-semibold text-gray-900 dark:text-gray-50">11.6%</span>
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 shrink-0 bg-rose-500 rounded-sm" aria-hidden="true" />
                                    <span className="text-sm">Unsatisfied</span>
                                </div>
                            </li>
                        </ul>
                    </Card>
                    {/* --- Card 2 --- */}
                    <Card>
                        {/* add other dd description */}
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Connected APIs</dt>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-y-4 gap-x-16">
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2.5 shrink-0 bg-blue-500 dark:bg-blue-500 rounded-sm" aria-hidden="true" />
                                        <span className="text-sm">Cache hit rate</span>
                                    </div>
                                    <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">90.1%</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2.5 shrink-0 bg-gray-500 dark:bg-gray-500 rounded-sm" aria-hidden="true" />
                                        <span className="text-sm">Errors</span>
                                    </div>
                                    <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">33</span>
                                </div>
                            </div>
                            <div>
                                <ProgressCircle value={62} radius={60} strokeWidth={8} />
                            </div>
                        </div>
                    </Card>
                    {/* --- Card 3 --- */}
                    <Card>
                        {/* add other dd description */}
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Spend on compute</dt>
                        <div className="mt-4 flex items-center gap-y-4 gap-x-10">
                            <div className="space-y-3 w-1/3 whitespace-nowrap">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2.5 shrink-0 bg-blue-500 dark:bg-blue-500 rounded-sm" aria-hidden="true" />
                                        <span className="text-sm">Month-to-date</span>
                                    </div>
                                    <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">$10,573</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2.5 shrink-0 bg-gray-400 dark:bg-gray-600 rounded-sm" aria-hidden="true" />
                                        <span className="text-sm">Suspicous</span>
                                    </div>
                                    <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">$3,451</span>
                                </div>
                            </div>
                            <LineChart
                                className="h-32 w-2/3"
                                data={data}
                                index="date"
                                categories={["SolarPanels", "Inverters"]}
                                colors={["blue", "gray"]}
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
                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-medium text-gray-900 dark:text-gray-50">Requests over time</h2>
                        <div className="flex items-center gap-3">
                            <button type="button">
                                <RiArrowLeftSLine className="size-5 shrink-0 text-gray-700 dark:text-gray-300" aria-hidden="true" />
                            </button>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Jan 1 – Aug 31, 2024</span>
                            <button type="button">
                                <RiArrowRightSLine className="size-5 shrink-0 text-gray-700 dark:text-gray-300" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}
