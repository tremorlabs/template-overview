"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { cx, focusRing } from "@/lib/utils"
import { RiNotification2Line } from "@remixicon/react"
import { Button } from "../Button"

function Notifications() {
  const hasUnread = true
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Notifications (3 unread)"
            variant="ghost"
            className={cx(
              focusRing,
              "group relative size-9 rounded-full text-sm text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-200/50 data-[state=open]:bg-gray-200/50",
            )}
          >
            {hasUnread ? (
              <div className="absolute right-1.5 top-1.5 size-2.5 shrink-0 rounded-full bg-blue-500" />
            ) : null}
            <RiNotification2Line
              className="size-5 shrink-0 text-gray-500 group-hover:text-gray-700"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">Content</PopoverContent>
      </Popover>
    </>
  )
}

export { Notifications }
