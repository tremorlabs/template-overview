import { Transaction } from "@/data/transactions/schema"
import { cx } from "@/lib/utils"
import {
  RiArrowLeftCircleLine,
  RiArrowLeftRightLine,
  RiArrowRightCircleLine,
  RiBankCardLine,
} from "@remixicon/react"
import { ColumnDef } from "@tanstack/react-table"

import { Payment } from "@/data/transactions/schema"

const iconMapping: Record<Payment, React.ElementType> = {
  inbound: RiArrowRightCircleLine,
  outbound: RiArrowLeftCircleLine,
  transfer: RiArrowLeftRightLine,
  "card payment": RiBankCardLine,
}

export const columns = [
  {
    header: "Created at",
    accessorKey: "created",
    meta: {
      className: "text-left",
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className={cx(
            "size-2 shrink-0 rounded-full",
            row.original.status === "approved"
              ? "bg-emerald-600 dark:bg-emerald-400"
              : "bg-gray-400 dark:bg-gray-600",
          )}
        />
        {new Date(row.original.created).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    meta: {
      className: "text-left",
      cell: "font-medium text-gray-900 dark:text-gray-50 capitalize",
    },
  },
  {
    header: "Key Account",
    accessorKey: "additional",
    meta: {
      className: "text-left",
      cell: "capitalize",
    },
  },
  {
    header: "Type",
    accessorKey: "type",
    meta: {
      className: "text-left",
    },
    cell: ({ row }) => {
      const Icon = iconMapping[row.original.paymentType as Payment]
      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
          <span className="capitalize">{row.original.paymentType}</span>
        </div>
      )
    },
  },
  {
    header: "Amount",
    accessorKey: "amount",
    meta: {
      className: "text-right",
    },
    cell: ({ row }) => {
      const CurrencyCell = (props: { number: string | null }) => {
        if (props.number === null) return null
        const num = parseFloat(props.number)
        const isNegative = num < 0
        const absNum = Math.abs(num)
        const formatted = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(absNum)
        const [dollars, cents] = formatted.split(".")
        return (
          <span className="ml-auto text-gray-400">
            {isNegative ? "(" : ""}
            <span>$</span>
            <span className="font-medium text-gray-950">{dollars}</span>
            <span>.{cents}</span>
            {isNegative ? ")" : ""}
          </span>
        )
      }

      return (
        <div className="flex items-center gap-2">
          <CurrencyCell number={row.original.amount} />
        </div>
      )
    },
  },
] as ColumnDef<Transaction>[]
