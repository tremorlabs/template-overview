import { Transaction } from "@/data/schemaTransactions";
import { cx } from "@/lib/utils";
import { RiArrowLeftCircleLine, RiArrowLeftRightLine, RiArrowRightCircleLine, RiBankCardLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";

type Status = 'inbound' | 'outbound' | 'transfer' | 'card payment';

const iconMapping: Record<Status, React.ElementType> = {
    'inbound': RiArrowRightCircleLine,
    'outbound': RiArrowLeftCircleLine,
    'transfer': RiArrowLeftRightLine,
    'card payment': RiBankCardLine
};


export const columns = [
    {
        header: 'Created at',
        accessorKey: 'created',
        meta: {
            className: 'text-left',
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span
                    className={cx(
                        "size-2 rounded-full shrink-0",
                        row.getValue('status') === 'approved'
                            ? 'bg-emerald-600 dark:bg-emerald-400'
                            : 'bg-gray-400 dark:bg-gray-600'
                    )}
                />
                <span>{row.getValue('created')}</span>
            </div>
        ),
    },
    {
        header: 'Description',
        accessorKey: 'description',
        meta: {
            className: 'text-left',
            cell: 'font-medium text-gray-900 dark:text-gray-50',
        },
    },
    {
        header: 'Additional info',
        accessorKey: 'additional',
        meta: {
            className: 'text-left',
        },
    },
    {
        header: 'Type',
        accessorKey: 'type',
        meta: {
            className: 'text-left',
        },
        cell: ({ row }) => {
            const Icon = iconMapping[row.original.iconType as Status];
            return (
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
                    <span>{row.getValue('type')}</span>
                </div>
            );
        }
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
        meta: {
            className: 'text-right',
        },
    },
] as ColumnDef<Transaction>[]

