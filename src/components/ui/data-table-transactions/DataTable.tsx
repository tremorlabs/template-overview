"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow
} from "@/components/Table"
import { cx } from "@/lib/utils"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { DataTablePagination } from "../data-table/DataTablePagination"

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
    const pageSize = 16

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: false,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: pageSize,
            },
        },
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <div className="space-y-3 mt-6">
                <div className="relative overflow-hidden overflow-x-auto">
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="border-gray-200 dark:border-gray-800"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHeaderCell
                                            key={header.id}
                                            className={cx(
                                                "py-2.5 whitespace-nowrap",
                                                header.column.columnDef.meta?.className,
                                            )}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableHeaderCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cx(
                                                "py-2.5 whitespace-nowrap",
                                                cell.column.columnDef.meta?.className,
                                                cell.column.columnDef.meta?.cell
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination table={table} pageSize={pageSize} />
            </div>

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
        </>
    )
}
