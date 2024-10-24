import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { agents } from "@/data/agents"

export default function Overview() {
  return (
    <main>
      <div className="flex items-center justify-between border-b pb-6">
        <h1 className="text-2xl font-semibold text-gray-950">Call Agents</h1>
        {/* <Button variant="secondary" className="group flex gap-2">
          <RiRefreshLine
            aria-hidden="true"
            className="size-5 shrink-0 transition group-hover:rotate-[25deg] group-active:rotate-90"
          />
          Refresh
        </Button> */}
      </div>
      <section className="mt-12">
        <DataTable data={agents} columns={columns} />
      </section>
    </main>
  )
}
