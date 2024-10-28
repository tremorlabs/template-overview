"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { CategoryBar } from "@/components/CategoryBar"
import { LineChart } from "@/components/LineChart"
import { ProgressCircle } from "@/components/ProgressCircle"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow
} from "@/components/Table"
import { TransactionDrawer } from "@/components/TransactionDrawer"
import { cx } from "@/lib/utils"
import { RiArrowDownSLine, RiArrowLeftCircleLine, RiArrowLeftRightLine, RiArrowRightCircleLine, RiBankCardLine } from "@remixicon/react"
import React from "react"

const data = [
    //array-start
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
    //array-end
]

const tableData = [
    //array-start
    {
        id: 1,
        status: "approved",
        created: "Oct 2, 2:53pm",
        description: "Payroll",
        additional: "Gusto",
        type: "ACH Transfer",
        iconType: "outbound",
        amount: "-$3,783.00",
    },
    {
        id: 2,
        status: "open",
        created: "Oct 1, 1:03am",
        description: "Funding",
        additional: "Stuart Little",
        type: "Inbound Wire Transfer",
        iconType: "inbound",
        amount: "+$500,000.00",
    },
    {
        id: 3,
        status: "open",
        created: "Sep 30, 10:41am",
        description: "Invoice 22345",
        additional: "JPMorgan Chase Bank ••1189",
        type: "ACH Debit Transfer",
        iconType: "inbound",
        amount: "+$50,000.00",
    },
    {
        id: 4,
        status: "approved",
        created: "Sep 29, 05:32pm",
        description: "Jimmy Nadoe",
        additional: "USAA Federal Savings Bank ••4478",
        type: "Inbound ACH Transfer",
        iconType: "inbound",
        amount: "+$1,200.00",
    },
    {
        id: 5,
        status: "approved",
        created: "Sep 28, 3:21pm",
        description: "Office Supplies",
        additional: "Staples",
        type: "Credit Card Payment",
        iconType: "card payment",
        amount: "-$320.00",
    },
    {
        id: 6,
        status: "approved",
        created: "Sep 27, 9:08am",
        description: "Consulting Fee",
        additional: "John Consulting",
        type: "ACH Transfer",
        iconType: "transfer",
        amount: "+$10,000.00",
    },
    {
        id: 7,
        status: "open",
        created: "Sep 26, 11:55am",
        description: "Rent Payment",
        additional: "ABC Realty",
        type: "ACH Debit",
        iconType: "outbound",
        amount: "-$5,000.00",
    },
    {
        id: 8,
        status: "open",
        created: "Sep 25, 4:00pm",
        description: "Client Payment",
        additional: "Wells Fargo Bank ••2267",
        type: "Inbound Wire Transfer",
        iconType: "inbound",
        amount: "+$15,500.00",
    },
    {
        id: 9,
        status: "open",
        created: "Sep 24, 6:35pm",
        description: "Marketing",
        additional: "Google Ads",
        type: "Credit Card Payment",
        iconType: "card payment",
        amount: "-$1,250.00",
    },
    {
        id: 10,
        status: "approved",
        created: "Sep 23, 3:15pm",
        description: "Insurance Premium",
        additional: "Progressive Insurance",
        type: "ACH Transfer",
        iconType: "transfer",
        amount: "-$850.00",
    },
    {
        id: 11,
        status: "approved",
        created: "Sep 22, 9:47am",
        description: "Software Subscription",
        additional: "Salesforce",
        type: "ACH Debit Transfer",
        iconType: "outbound",
        amount: "-$2,200.00",
    },
    {
        id: 12,
        status: "approved",
        created: "Sep 21, 8:00pm",
        description: "Client Refund",
        additional: "Jane Doe",
        type: "ACH Transfer",
        iconType: "outbound",
        amount: "-$1,000.00",
    },
    {
        id: 13,
        status: "approved",
        created: "Sep 20, 11:10am",
        description: "Payment Received",
        additional: "Bank of America ••6790",
        type: "Inbound ACH Transfer",
        iconType: "inbound",
        amount: "+$7,500.00",
    },
    {
        id: 14,
        status: "approved",
        created: "Sep 19, 2:44pm",
        description: "Utilities",
        additional: "ConEdison",
        type: "ACH Debit Transfer",
        iconType: "transfer",
        amount: "-$540.00",
    },
    {
        id: 15,
        status: "approved",
        created: "Sep 18, 10:17am",
        description: "Advertising",
        additional: "Facebook",
        type: "Credit Card Payment",
        iconType: "card payment",
        amount: "-$1,800.00",
    },
    {
        id: 16,
        status: "open",
        created: "Sep 17, 1:25pm",
        description: "Legal Fees",
        additional: "Law Offices of S. Smith",
        type: "ACH Transfer",
        iconType: "transfer",
        amount: "-$4,300.00",
    },
    {
        id: 17,
        status: "approved",
        created: "Sep 16, 8:15am",
        description: "Investor Funding",
        additional: "Venture Capital Co",
        type: "Inbound Wire Transfer",
        iconType: "inbound",
        amount: "+$250,000.00",
    },
    {
        id: 18,
        status: "open",
        created: "Sep 15, 12:53pm",
        description: "Equipment Purchase",
        additional: "Best Buy",
        type: "ACH Debit",
        iconType: "outbound",
        amount: "-$3,200.00",
    },
    {
        id: 19,
        status: "approved",
        created: "Sep 14, 4:30pm",
        description: "Payroll",
        additional: "ADP",
        type: "ACH Transfer",
        iconType: "transfer",
        amount: "-$6,500.00",
    },
    {
        id: 20,
        status: "approved",
        created: "Sep 13, 7:35am",
        description: "Client Payment",
        additional: "Citibank ••9283",
        type: "Inbound Wire Transfer",
        iconType: "inbound",
        amount: "+$22,000.00",
    },
    {
        id: 21,
        status: "approved",
        created: "Sep 12, 2:22pm",
        description: "Research Expense",
        additional: "LexisNexis",
        type: "Credit Card Payment",
        iconType: "card payment",
        amount: "-$500.00",
    },
    {
        id: 22,
        status: "approved",
        created: "Sep 11, 5:40pm",
        description: "Travel Reimbursement",
        additional: "Employee A",
        type: "ACH Transfer",
        iconType: "outbound",
        amount: "-$300.00",
    },
    {
        id: 23,
        status: "approved",
        created: "Sep 10, 10:15am",
        description: "Invoice 22451",
        additional: "Wells Fargo Bank ••4567",
        type: "Inbound ACH Transfer",
        iconType: "inbound",
        amount: "+$12,500.00",
    },
    {
        id: 24,
        status: "approved",
        created: "Sep 9, 4:07pm",
        description: "Web Hosting Fee",
        additional: "Amazon Web Services",
        type: "Credit Card Payment",
        iconType: "card payment",
        amount: "-$750.00",
    },
    {
        id: 25,
        status: "open",
        created: "Sep 8, 11:30am",
        description: "Miscellaneous Expense",
        additional: "Office Supplies",
        type: "Debit Card Payment",
        iconType: "card payment",
        amount: "-$200.00",
    },
    //array-end
];

type Status = 'inbound' | 'outbound' | 'transfer' | 'card payment';

const iconMapping: Record<Status, React.ElementType> = {
    'inbound': RiArrowRightCircleLine,
    'outbound': RiArrowLeftCircleLine,
    'transfer': RiArrowLeftRightLine,
    'card payment': RiBankCardLine
};



export default function Home() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
            {/* @chris: only for video purposes */}
            {/* <main className="px-4 sm:px-6 pb-32 lg:px-20"> */}
            <>
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        <h2 className="font-medium text-gray-900 dark:text-gray-50">Overview</h2>
                        {/* <p className="mt-2 flex items-baseline gap-x-3">
                            <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">$450,432</span>
                            <span className="text-lg font-medium text-gray-500 dark:text-gray-500">$420,210 available</span>
                        </p> */}
                    </div>
                    <Button onClick={() => setIsOpen(true)} variant="secondary" className="flex items-center gap-2">
                        Move money
                        <RiArrowDownSLine className="size-5 shrink-0" aria-hidden="true" />
                    </Button>
                    <TransactionDrawer open={isOpen} onOpenChange={setIsOpen} />
                </div>
                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* --- Card 1 --- */}
                    <Card>
                        {/* add other dd description */}
                        <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">Response time</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">2min 3s</dd>
                        <CategoryBar
                            values={[70, 18, 12]}
                            className="mt-6"
                            colors={["blue", "gray", "rose"]}
                            showLabels={false}
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
                                <ProgressCircle value={62} radius={40} strokeWidth={7} />
                            </div>
                        </div>
                    </Card>
                    {/* --- Card 3 --- */}
                    <Card>
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
                                className="h-28 w-2/3"
                                data={data}
                                index="date"
                                categories={["SolarPanels", "Inverters"]}
                                colors={["blue", "lightGray"]}
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
                <TableRoot className="mt-6">
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
                                        {/* @SEV: further simplified? */}
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
                </TableRoot>
                {/* @CHRIS: pagination */}

                {/* <div className="mt-8">
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
                </div> */}
            </>
        </>
    )
}
