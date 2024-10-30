"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { LineChart } from "@/components/LineChart"
import { ProgressCircle } from "@/components/ProgressCircle"
import { TransactionDrawer } from "@/components/ui/TransactionDrawer"
import { DataTable } from "@/components/ui/data-table-transactions/DataTable"
import { columns } from "@/components/ui/data-table-transactions/columns"
import { spendings } from "@/data/chart-data"
import { transactions } from "@/data/transactions"
import { RiArrowDownSLine } from "@remixicon/react"
import React from "react"


export default function Overview() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Primary account</h2>
                    <p className="text-sm/6 text-gray-600 dark:text-gray-400">Seamless control of your finances with AI-powered support</p>
                </div>
                <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
                    Move money
                    {/* @CHRIS: add popover dropdown */}
                    <RiArrowDownSLine className="size-5 shrink-0" aria-hidden="true" />
                </Button>
                <TransactionDrawer open={isOpen} onOpenChange={setIsOpen} />
            </div>
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* --- Card 1 --- */}
                <Card>
                    {/* @SEV: challenge <dd> description */}
                    <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Current expenses</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">$4,390.25</dd>
                    <CategoryBar
                        values={[70, 18, 12]}
                        className="mt-6"
                        colors={["blue", "lightGray", "rose"]}
                        showLabels={false}
                    />
                    <ul role="list" className="mt-4 flex flex-wrap gap-y-4 gap-x-10 text-sm">
                        <li>
                            <span className="text-base font-semibold text-gray-900 dark:text-gray-50">70.1%</span>
                            <div className="flex items-center gap-2">
                                <span className="size-2.5 shrink-0 bg-blue-500 dark:bg-blue-500 rounded-sm" aria-hidden="true" />
                                <span className="text-sm">Approved</span>
                            </div>
                        </li>
                        <li>
                            <span className="text-base font-semibold text-gray-900 dark:text-gray-50">18.3%</span>
                            <div className="flex items-center gap-2">
                                <span className="size-2.5 shrink-0 bg-gray-400 dark:bg-gray-600 rounded-sm" aria-hidden="true" />
                                <span className="text-sm">Open</span>
                            </div>
                        </li>
                        <li>
                            <span className="text-base font-semibold text-gray-900 dark:text-gray-50">11.6%</span>
                            <div className="flex items-center gap-2">
                                <span className="size-2.5 shrink-0 bg-rose-500 dark:bg-rose-500 rounded-sm" aria-hidden="true" />
                                <span className="text-sm">In audit</span>
                            </div>
                        </li>
                    </ul>
                </Card>
                {/* --- Card 2 --- */}
                <Card>
                    {/* @SEV: challenge <dd> description */}
                    <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Budget health</dt>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-y-4 gap-x-16">
                        <dd className="space-y-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 shrink-0 bg-blue-500 dark:bg-blue-500 rounded-sm" aria-hidden="true" />
                                    <span className="text-sm">Transactions within budget</span>
                                </div>
                                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">90.1%</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="size-2.5 shrink-0 bg-gray-400 dark:bg-gray-600 rounded-sm" aria-hidden="true" />
                                    <span className="text-sm">Outlier transactions</span>
                                </div>
                                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">33</span>
                            </div>
                        </dd>
                        <div>
                            <ProgressCircle value={62} radius={45} strokeWidth={7} className="[&_circle:first-child]:stroke-gray-300 [&_circle:first-child]:dark:stroke-gray-700" />
                        </div>
                    </div>
                </Card>
                {/* --- Card 3 --- */}
                <Card>
                    {/* @SEV: challenge <dd> description */}
                    <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Expenses this month</dt>
                    <div className="mt-4 flex items-center gap-y-4 gap-x-8">
                        <dd className="space-y-3 whitespace-nowrap">
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
                                    <span className="text-sm">Previous month</span>
                                </div>
                                <span className="mt-1 block text-2xl font-semibold text-gray-900 dark:text-gray-50">$3,451</span>
                            </div>
                        </dd>
                        <LineChart
                            className="h-28"
                            data={spendings}
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
            {/* keep old version */}

            {/* <TableRoot className="mt-6">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell className="py-2.5">Created at</TableHeaderCell>
                                <TableHeaderCell className="py-2.5">Description</TableHeaderCell>
                                <TableHeaderCell className="py-2.5">Additional info</TableHeaderCell>
                                <TableHeaderCell className="py-2.5">Type</TableHeaderCell>
                                <TableHeaderCell className="text-right py-2.5">
                                    Amount
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex items-center gap-2.5 py-2.5">
                                        <span className={cx(
                                            item.status === 'open' ? 'bg-gray-400 dark:bg-gray-600' : 'bg-emerald-600 dark:bg-emerald-400',
                                            "size-2 rounded-full shrink-0"
                                        )} aria-label={`Transaction is ${item.status}`} />
                                        {item.created}
                                    </TableCell>
                                    <TableCell className="py-2.5 font-medium text-gray-900 dark:text-gray-50">{item.description}</TableCell>
                                    <TableCell className="py-2.5">{item.additional}</TableCell>
                                    <TableCell className="py-2.5 flex items-center gap-2">
                                        {(() => {
                                            const Icon = iconMapping[item.iconType as Status];
                                            return <Icon className="size-4 shrink-0" aria-hidden="true" />;
                                        })()}
                                        {item.type}
                                    </TableCell>
                                    <TableCell className="text-right py-2.5 font-medium text-gray-900 dark:text-gray-50">{item.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableRoot> */}

            <DataTable data={transactions} columns={columns} />

        </>
    )
}
