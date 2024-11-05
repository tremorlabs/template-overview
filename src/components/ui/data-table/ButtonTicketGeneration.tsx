import React from "react"

import { cx, focusRing } from "@/lib/utils"
import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react"

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  initalState: boolean
}

const ButtonTicketGeneration = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ initalState, className, ...props }: ButtonProps, forwardedRef) => {
    const [internalState, setInternalState] = React.useState(initalState)
    return (
      <button
        ref={forwardedRef}
        className={cx(
          // base
          "relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out",
          // disabled
          "disabled:pointer-events-none disabled:shadow-none",
          // focus
          focusRing,
          // border
          "border-gray-300 dark:border-gray-800",
          // text color
          "text-gray-900 dark:text-gray-50",
          // background color
          "bg-white dark:bg-gray-950",
          //hover color
          "hover:bg-gray-50 dark:hover:bg-gray-900/60",
          // disabled
          "disabled:text-gray-400",
          "disabled:dark:text-gray-600",
          className,
        )}
        tremor-id="tremor-raw"
        onClick={() => setInternalState(!internalState)}
        {...props}
      >
        {internalState ? (
          <RiCheckboxCircleFill
            className="size-4 shrink-0 text-emerald-600 dark:text-emerald-500"
            aria-hidden="true"
          />
        ) : (
          <RiCloseCircleFill
            className="size-4 shrink-0 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
          />
        )}
        {internalState ? "Enabled" : "Disabled"}
      </button>
    )
  },
)

ButtonTicketGeneration.displayName = "ButtonTicketGeneration"

export { ButtonTicketGeneration }
