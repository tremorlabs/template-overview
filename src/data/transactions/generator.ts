import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import {
  destinations,
  paymentOptions,
  paymentType,
  statusOptions,
} from "./schema"

const getRandomAmount = () => {
  const isNegative = faker.datatype.boolean({ probability: 0.7 })
  const amount = faker.number.float({ min: 100, max: 10000 })
  return isNegative ? `-${amount}` : `${amount}`
}

const getTransactionType = () => {
  const option = faker.helpers.arrayElement(paymentOptions)
  return `${option.value}-transfer`
}

const transactions = Array.from({ length: 100 }, () => {
  const destination = faker.helpers.arrayElement(destinations)
  return {
    status: faker.helpers.arrayElement(statusOptions),
    created: faker.date
      .between({
        from: "2023-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
      })
      .toISOString(),
    description: faker.helpers.arrayElement([
      "payroll",
      "invoice",
      "subscription",
      "refund",
      "service fee",
    ]),
    additional: destination.label.toLowerCase(),
    type: getTransactionType(),
    paymentType: faker.helpers.arrayElement(paymentType),
    amount: getRandomAmount(),
  }
})

fs.writeFileSync(
  path.join(__dirname, "transactions.ts"),
  `import { Transaction } from "./schema";\n\nexport const transactions: Transaction[] = ${JSON.stringify(transactions, null, 2)};`,
)
