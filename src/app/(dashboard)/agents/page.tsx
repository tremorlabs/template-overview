import { Divider } from "@/components/Divider"
import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table/DataTable"
import { agents } from "@/data/agents/agents"

export default function Agents() {
  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Agents
          </h1>
          <p className="text-sm/6 text-gray-600 dark:text-gray-400">
            Monitor agent performance and manage ticket generation
          </p>
        </div>
      </div>
      <Divider />
      <section className="mt-8">
        <DataTable data={agents} columns={columns} />
      </section>
    </main>
  )
}
