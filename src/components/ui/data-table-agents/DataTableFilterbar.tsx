"use client"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { Switch } from "@/components/Switch"
import { RiDownloadLine } from "@remixicon/react"
import { useDebouncedCallback } from "use-debounce"

interface DataTableSearchProps {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  registeredOnly: boolean
  setRegisteredOnly: (checked: boolean) => void
}

export function Filterbar({
  globalFilter,
  setGlobalFilter,
  registeredOnly,
  setRegisteredOnly,
}: DataTableSearchProps) {
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    setGlobalFilter(value)
  }, 300)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-x-6">
      <div className="flex items-center gap-6">
        <Input
          className="w-fit"
          type="search"
          placeholder="Search all columns..."
          defaultValue={globalFilter ?? ""}
          onChange={(e) => debouncedOnChange(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Switch
            size="small"
            id="registered"
            checked={registeredOnly}
            onCheckedChange={(checked) => setRegisteredOnly(checked)}
          />
          <Label htmlFor="registered" className="text-sm text-gray-600">
            Registered agents only
          </Label>
        </div>
      </div>
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
