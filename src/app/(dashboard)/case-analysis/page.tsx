import { Button } from "@/components/Button"
import { RiRefreshLine } from "@remixicon/react"

export default function Overview() {
  return (
    <main>
      <div className="flex items-center justify-between border-b pb-6">
        <h1 className="text-3xl font-semibold text-gray-950">Case Analysis</h1>
        <Button variant="secondary" className="group flex gap-2">
          <RiRefreshLine
            aria-hidden="true"
            className="size-5 shrink-0 transition group-hover:rotate-[25deg] group-active:rotate-90"
          />
          Refresh
        </Button>
      </div>
    </main>
  )
}
