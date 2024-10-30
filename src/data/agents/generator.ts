import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import { accounts } from "./schema"

const agents = Array.from({ length: 102 }, () => {
  const fullName = `${faker.person.firstName()} ${faker.person.lastName()}`
  const minutes_booked = faker.number.int({ min: 480, max: 9600 })
  const startDate = faker.date.between({
    from: "2015-02-01T00:00:00Z",
    to: "2024-10-17T00:00:00Z",
  })

  return {
    agent_id: faker.string.alphanumeric(6),
    full_name: fullName,
    start_date: startDate.toISOString(),
    end_date: faker.datatype.boolean({ probability: 0.22 })
      ? faker.date
          .between({ from: startDate, to: "2024-10-17T00:00:00Z" })
          .toISOString()
      : null,
    account: faker.helpers.arrayElement(accounts).label,
    number: faker.phone.number({ style: "international" }),
    email: `${fullName.charAt(0).toLowerCase()}${fullName
      .split(" ")[1]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")}@overview.com`,
    registered: faker.datatype.boolean({ probability: 0.82 }),
    minutes_called: Math.floor(
      minutes_booked * faker.number.float({ min: 0.4, max: 0.99 }),
    ),
    minutes_booked,
    ticket_generation: faker.datatype.boolean({ probability: 0.8 }),
  }
})

fs.writeFileSync(
  path.join(__dirname, "agents.ts"),
  `import { Agent } from "./schema";\nexport const agents: Agent[] = ${JSON.stringify(agents, null, 2)};`,
)
