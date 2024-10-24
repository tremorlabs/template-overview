// Tremor Button [v0.2.0]

import { Slot } from "@radix-ui/react-slot"
import React from "react"

import { cx, focusRing } from "@/lib/utils"

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const ButtonTicketGeneration = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      loadingText,
      className,
      disabled,
      children,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-2 py-1 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out",
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
        {...props}
      >
        {children}
      </Component>
    )
  },
)

ButtonTicketGeneration.displayName = "ButtonTicketGeneration"

export { ButtonTicketGeneration }
