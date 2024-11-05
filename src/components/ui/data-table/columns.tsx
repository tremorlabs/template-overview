"use client"

import { Badge } from "@/components/Badge"
import { ProgressCircle } from "@/components/ProgressCircle"
import { Agent } from "@/data/agents/schema"
import { cx } from "@/lib/utils"
import { RiShieldCheckFill } from "@remixicon/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { ButtonTicketGeneration } from "./ButtonTicketGeneration"
import { DataTableColumnHeader } from "./DataTableColumnHeader"

const columnHelper = createColumnHelper<Agent>()

export const columns = [
  columnHelper.accessor("registered", {
    enableColumnFilter: true,
    enableSorting: true,
    enableHiding: true,
    meta: {
      displayName: "Registered",
      className: "hidden",
    },
  }),
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
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {row.original.full_name}
          </span>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-500 dark:text-gray-500">AgID </span>
            <span className="font-mono font-medium uppercase tabular-nums text-gray-900 dark:text-gray-50">
              {row.original.agent_id}
            </span>
            <RiShieldCheckFill
              className={cx(
                "size-3 shrink-0",
                row.original.registered
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-400 dark:text-gray-600",
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
          <span className="text-gray-900 dark:text-gray-50">
            {row.original.number.replace(
              /(\+41)(\d{2})(\d{3})(\d{2})(\d{2})/,
              "$1 $2 $3 $4 $5",
            )}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {row.original.email}
          </span>
        </div>
      )
    },
  }),
  columnHelper.accessor("end_date", {
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
          <span className="tabular-nums text-gray-900 dark:text-gray-50">
            {row.original.end_date ? (
              <>
                End:{" "}
                {new Date(row.original.end_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </>
            ) : (
              <Badge className="px-1.5 py-0.5" variant="success">
                Active
              </Badge>
            )}
          </span>
          <span className="text-xs tabular-nums text-gray-500 dark:text-gray-500">
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
  columnHelper.accessor("account", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Account",
    },
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-gray-900 dark:text-gray-50">
            {row.original.account}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Main division
          </span>
        </div>
      )
    },
  }),

  columnHelper.accessor("minutes_called", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity (mins)" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Capacity (mins)",
    },
    cell: ({ row }) => {
      const { minutes_called, minutes_booked } = row.original

      const calculatePercentage = () => {
        if (!minutes_booked || minutes_booked === 0) return 0
        return (minutes_called / minutes_booked) * 100
      }

      const capacity = calculatePercentage()

      const getColorByCapacity = (value: number) => {
        const fixedValue = parseFloat(value.toFixed(0))
        if (fixedValue >= 85) return "error"
        if (fixedValue > 60) return "warning"
        return "default"
      }

      return (
        <div className="flex gap-2">
          <div className="flex items-center gap-x-2.5">
            <ProgressCircle
              value={capacity}
              radius={14}
              strokeWidth={3}
              variant={getColorByCapacity(capacity)}
              aria-hidden={true}
            >
              <span className="text-[11px] font-semibold">
                {capacity.toFixed(0)}
              </span>
            </ProgressCircle>
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-gray-900 dark:text-gray-50">
              <span className="text-gray-500 dark:text-gray-500">Called </span>
              <span className="font-medium">
                {new Intl.NumberFormat().format(minutes_called)}
              </span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Booked {new Intl.NumberFormat().format(minutes_booked)}
            </span>
          </div>
        </div>
      )
    },
  }),
  columnHelper.accessor("ticket_generation", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticket Generation" />
    ),
    enableSorting: false,
    meta: {
      className: "text-left",
      displayName: "Ticket Generation",
    },
    cell: ({ row }) => {
      return (
        <ButtonTicketGeneration initalState={row.original.ticket_generation} />
      )
    },
  }),
] as ColumnDef<Agent>[]
