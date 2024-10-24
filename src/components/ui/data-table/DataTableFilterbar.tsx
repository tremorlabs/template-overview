"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { RiDownloadLine } from "@remixicon/react"
import { useDebouncedCallback } from "use-debounce"

interface DataTableSearchProps {
  value: string
  onChange: (value: string) => void
}

export function Filterbar({ value, onChange }: DataTableSearchProps) {
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange(value)
  }, 300)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <Input
        className="w-fit"
        type="search"
        placeholder="Search all columns..."
        defaultValue={value ?? ""}
        onChange={(e) => debouncedOnChange(e.target.value)}
      />
      <Button
        variant="secondary"
        className="hidden items-center gap-x-2 lg:flex"
      >
        <RiDownloadLine className="size-4 shrink-0" aria-hidden="true" />
        Export
      </Button>
    </div>
  )
}
