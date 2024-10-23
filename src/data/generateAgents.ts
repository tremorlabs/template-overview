import { fakerDE_CH as faker } from "@faker-js/faker"
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

const generateEmailFromName = (fullName: string) => {
  const [firstName, lastName] = fullName.split(" ")
  const firstInitial = firstName.charAt(0).toLowerCase()
  const cleanLastName = lastName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
  return `${firstInitial}${cleanLastName}@overview.com`
}

const agents = Array.from({ length: 102 }, () => {
  const minutes = generateAgentMinutes()
  const fullName = `${faker.person.firstName()} ${faker.person.lastName()}`

  return {
    agent_id: `${faker.string.alphanumeric(6)}`,
    full_name: fullName,
    start_date: faker.date
      .between({ from: "2015-02-01T00:00:00Z", to: "2024-10-17T00:00:00Z" })
      .toISOString(),
    end_date: faker.date
      .between({ from: "2015-02-01T00:00:00Z", to: "2024-10-17T00:00:00Z" })
      .toISOString(),
    account: faker.helpers.arrayElement(accounts),
    number: faker.phone.number({ style: "international" }),
    email: generateEmailFromName(fullName),
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
