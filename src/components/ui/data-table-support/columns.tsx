import { Badge } from "@/components/Badge"
import { Ticket } from "@/data/support/schema"
import { cx } from "@/lib/utils"
import {
  RiAlarmWarningLine,
  RiFileCheckLine,
  RiFileListLine,
  RiFolderReduceLine,
} from "@remixicon/react"
import { ColumnDef } from "@tanstack/react-table"

const typeIconMapping: Record<string, React.ElementType> = {
  "fnol-contact": RiFolderReduceLine,
  "policy-contact": RiFileListLine,
  "claims-contact": RiFileCheckLine,
  "emergency-contact": RiAlarmWarningLine,
}

export const columns = [
  {
    header: "Created at",
    accessorKey: "created",
    meta: {
      className: "text-left",
    },
    cell: ({ row }) => (
      <>
        {new Date(row.original.created).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    meta: {
      className: "text-left",
      cell: "font-medium text-gray-900 dark:text-gray-50",
    },
  },
  {
    header: "Policy Info",
    accessorKey: "policyNumber",
    meta: {
      className: "text-left",
      cell: "font-medium",
    },
  },
  {
    header: "Contact Type",
    accessorKey: "type",
    meta: {
      className: "text-left",
    },
    cell: ({ row }) => {
      const Icon = typeIconMapping[row.original.type]
      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
          <span className="capitalize">
            {row.original.type.replace("-contact", "")}
          </span>
        </div>
      )
    },
  },
  {
    header: "Duration",
    accessorKey: "duration",
    meta: {
      className: "text-right",
    },
    cell: ({ row }) => {
      const DurationCell = (props: { minutes: string | null }) => {
        if (props.minutes === null) return null
        const mins = parseInt(props.minutes)
        const hours = Math.floor(mins / 60)
        const remainingMins = mins % 60

        return (
          <span className="ml-auto text-gray-600 dark:text-gray-300">
            {hours > 0 ? `${hours}h ` : ""}
            {remainingMins}m
          </span>
        )
      }
      return (
        <div className="flex items-center gap-2">
          <DurationCell minutes={row.original.duration} />
        </div>
      )
    },
  },
  {
    header: "Assessed Priority",
    accessorKey: "priority",
    meta: {
      className: "text-left",
    },
    cell: ({ row }) => (
      <Badge
        variant="neutral"
        className="gap-1.5 font-normal capitalize text-gray-700 dark:text-gray-300"
      >
        <span
          className={cx(
            "size-2 shrink-0 rounded-sm",
            "bg-gray-500 dark:bg-gray-500",
            {
              "bg-emerald-600 dark:bg-emerald-400":
                row.original.priority === "low",
            },
            {
              "bg-gray-500 dark:bg-gray-500":
                row.original.priority === "medium",
            },
            {
              "bg-orange-500 dark:bg-orange-500":
                row.original.priority === "high",
            },
            {
              "bg-red-500 dark:bg-red-500":
                row.original.priority === "emergency",
            },
          )}
          aria-hidden="true"
        />
        {row.original.priority}
      </Badge>
    ),
  },
] as ColumnDef<Ticket>[]
