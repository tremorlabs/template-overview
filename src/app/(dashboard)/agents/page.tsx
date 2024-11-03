import { Divider } from "@/components/Divider"
import { DataTable } from "@/components/ui/data-table-agents/DataTable"
import { columns } from "@/components/ui/data-table-agents/columns"
import { agents } from "@/data/agents/agents"

export default function Overview() {
  return (
    <main>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Call Agents</h1>
      <Divider />
      <section>
        <DataTable data={agents} columns={columns} />
      </section>
    </main>
  )
}
