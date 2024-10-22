import { faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import { accounts } from "./schemaAgents"

const generateAgentMinutes = () => {
  const minutes_booked = faker.number.int({ min: 480, max: 9600 })
  const utilizationRate = faker.number.float({ min: 0.6, max: 0.85 })
  const minutes_called = Math.floor(minutes_booked * utilizationRate)

  return {
    minutes_booked,
    minutes_called,
  }
}

const agents = Array.from({ length: 102 }, () => {
  const minutes = generateAgentMinutes()
  return {
    agent_id: `ag-${faker.string.nanoid()}`,
    full_name: faker.person.fullName(),
    start_date: faker.date
      .between({ from: "2015-02-01T00:00:00Z", to: "2024-10-17T00:00:00Z" })
      .toISOString(),
    end_date: faker.date
      .between({ from: "2015-02-01T00:00:00Z", to: "2024-10-17T00:00:00Z" })
      .toISOString(),
    account: faker.helpers.arrayElement(accounts),
    caller_number: faker.phone.number(),
    registered: faker.datatype.boolean({ probability: 0.82 }),
    minutes_called: minutes.minutes_called,
    minutes_booked: minutes.minutes_booked,
    ticket_generation: faker.datatype.boolean({ probability: 0.3 }),
  }
})

const finalArray = `import { Agent } from "./schemaAgents";
export const agents: Agent[] = ${JSON.stringify(agents, null, 2)};
`

fs.writeFileSync(path.join(__dirname, "agents.ts"), finalArray)
console.log("Data generated")
