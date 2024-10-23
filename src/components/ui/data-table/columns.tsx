"use client"

// import { Badge, BadgeProps } from "@/components/Badge"
// import { statuses } from "@/data/data"
// import { formatters } from "@/lib/utils"
import { Agent } from "@/data/schemaAgents"
import { cx } from "@/lib/utils"
import { RiShieldCheckFill } from "@remixicon/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
// import { ConditionFilter } from "./DataTableFilter"
// import { DataTableRowActions } from "./DataTableRowActions"

const columnHelper = createColumnHelper<Agent>()

export const columns = [
  // columnHelper.accessor("agent", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Agent" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Agent",
  //   },
  // }),
  columnHelper.accessor("full_name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agent" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Agent",
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-gray-950">
            {row.original.full_name}
          </span>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-500">AgID </span>
            <span className="font-mono font-medium uppercase tabular-nums text-gray-950">
              {row.original.agent_id}
            </span>

            <RiShieldCheckFill
              className={cx(
                "size-3 shrink-0",
                row.original.registered ? "text-emerald-600" : "text-gray-400",
              )}
            />
          </div>
        </div>
      )
    },
  }),
  columnHelper.accessor("number", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Information" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Contact Information",
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-gray-950">
            {row.original.number.replace(
              /(\+41)(\d{2})(\d{3})(\d{2})(\d{2})/,
              "$1 $2 $3 $4 $5",
            )}
          </span>
          <span className="text-xs text-gray-500">{row.original.email}</span>
        </div>
      )
    },
  }),
  columnHelper.accessor("account", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Account",
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-gray-950">{row.original.account}</span>
          {/* <span className="text-xs text-gray-500">{row.original.account}</span> */}
        </div>
      )
    },
  }),
  columnHelper.accessor("contract", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contract Dates" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Contract Dates",
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="tabular-nums text-gray-950">
            End:{" "}
            {new Date(row.original.end_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          <span className="text-xs tabular-nums text-gray-500">
            Start:{" "}
            {new Date(row.original.start_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      )
    },
  }),

  // columnHelper.accessor("status", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   enableSorting: true,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Status",
  //   },
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (item) => item.value === row.getValue("status"),
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <Badge variant={status.variant as BadgeProps["variant"]}>
  //         {status.label}
  //       </Badge>
  //     )
  //   },
  // }),
  // columnHelper.accessor("region", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Region" />
  //   ),
  //   enableSorting: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Region",
  //   },
  //   filterFn: "arrIncludesSome",
  // }),
  // columnHelper.accessor("stability", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Stability" />
  //   ),
  //   enableSorting: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Stability",
  //   },
  //   cell: ({ getValue }) => {
  //     const value = getValue()

  //     function Indicator({ number }: { number: number }) {
  //       let category
  //       if (number === 0) {
  //         category = "zero"
  //       } else if (number < 9) {
  //         category = "bad"
  //       } else if (number >= 9 && number <= 15) {
  //         category = "ok"
  //       } else {
  //         category = "good"
  //       }

  //       const getBarClass = (index: number) => {
  //         if (category === "zero") {
  //           return "bg-gray-300 dark:bg-gray-800"
  //         } else if (category === "good") {
  //           return "bg-indigo-600 dark:bg-indigo-500"
  //         } else if (category === "ok" && index < 2) {
  //           return "bg-indigo-600 dark:bg-indigo-500"
  //         } else if (category === "bad" && index < 1) {
  //           return "bg-indigo-600 dark:bg-indigo-500"
  //         }
  //         return "bg-gray-300 dark:bg-gray-800"
  //       }

  //       return (
  //         <div className="flex gap-0.5">
  //           <div className={`h-3.5 w-1 rounded-sm ${getBarClass(0)}`} />
  //           <div className={`h-3.5 w-1 rounded-sm ${getBarClass(1)}`} />
  //           <div className={`h-3.5 w-1 rounded-sm ${getBarClass(2)}`} />
  //         </div>
  //       )
  //     }

  //     return (
  //       <div className="flex items-center gap-0.5">
  //         <span className="w-6">{value}</span>
  //         <Indicator number={value} />
  //       </div>
  //     )
  //   },
  // }),
  // columnHelper.accessor("costs", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Costs" />
  //   ),
  //   enableSorting: true,
  //   meta: {
  //     className: "text-right",
  //     displayName: "Costs",
  //   },
  //   cell: ({ getValue }) => {
  //     return (
  //       <span className=">{formatters.currency(getValue())}</span>
  //     )
  //   },
  //   filterFn: (row, columnId, filterValue: ConditionFilter) => {
  //     const value = row.getValue(columnId) as number
  //     const [min, max] = filterValue.value as [number, number]

  //     switch (filterValue.condition) {
  //       case "is-equal-to":
  //         return value == min
  //       case "is-between":
  //         return value >= min && value <= max
  //       case "is-greater-than":
  //         return value > min
  //       case "is-less-than":
  //         return value < min
  //       default:
  //         return true
  //     }
  //   },
  // }),
  // columnHelper.accessor("lastEdited", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Last edited" />
  //   ),
  //   enableSorting: false,
  //   meta: {
  //     className: "tabular-nums",
  //     displayName: "Last edited",
  //   },
  // }),
  // columnHelper.display({
  //   id: "edit",
  //   header: "Edit",
  //   enableSorting: false,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-right",
  //     displayName: "Edit",
  //   },
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // }),
] as ColumnDef<Agent>[]
