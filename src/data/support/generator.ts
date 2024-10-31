import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import {
  categoryTypes,
  policyTypes,
  priorities,
  statusOptions,
  ticketTypes,
  type Category,
  type PolicyType,
} from "./schema"

// Helper functions
const getRandomDuration = () => {
  const minutes = faker.number.int({ min: 2, max: 120 })
  return `${minutes}`
}

const getTicketType = () => {
  const option = faker.helpers.arrayElement(ticketTypes)
  return option.value
}

const generatePolicyNumber = (policyType: PolicyType) => {
  const prefixMap: Record<PolicyType, string> = {
    auto: "AUTO",
    home: "HOME",
    life: "LIFE",
    health: "HLTH",
    business: "BIZ",
    umbrella: "UMB",
  }
  const number = faker.string.numeric(8)
  return `${prefixMap[policyType]}-${number}`
}

// Category-specific descriptions
const descriptions: Record<Category, string[]> = {
  "accident-report": [
    "Car accident report - multi-vehicle collision",
    "Single vehicle incident report",
    "Property damage from vehicle",
    "Parking lot incident report",
    "Vehicle theft report",
  ],
  emergency: [
    "Roadside assistance needed",
    "Home emergency - water damage",
    "Medical emergency assistance",
    "Critical incident report",
    "Immediate assistance required",
  ],
  "claim-status": [
    "Following up on claim #REF-123",
    "Status update request for recent claim",
    "Document submission for existing claim",
    "Claim processing timeline inquiry",
    "Additional information for claim",
  ],
  "policy-changes": [
    "Update coverage limits",
    "Add new driver to policy",
    "Remove vehicle from coverage",
    "Change deductible amount",
    "Update policy beneficiaries",
  ],
  "coverage-inquiry": [
    "Coverage verification request",
    "Policy limits inquiry",
    "Coverage extension questions",
    "International coverage inquiry",
    "Additional coverage options",
  ],
  "document-request": [
    "Insurance card replacement",
    "Policy document copy request",
    "Proof of insurance needed",
    "Coverage verification letter",
    "Policy renewal documents",
  ],
  billing: [
    "Payment arrangement setup",
    "Premium increase inquiry",
    "Autopay enrollment",
    "Billing address update",
    "Payment method change",
  ],
  "new-quote": [
    "New auto policy quote",
    "Home insurance quote request",
    "Business coverage quote",
    "Life insurance quote",
    "Multiple policy quote",
  ],
  "account-service": [
    "Password reset request",
    "Online account access issues",
    "Update contact information",
    "Portal navigation assistance",
    "Account preferences update",
  ],
  complaint: [
    "Service delay complaint",
    "Claim handling dispute",
    "Coverage denial appeal",
    "Agent conduct complaint",
    "Billing dispute",
  ],
  "fraud-report": [
    "Suspicious claim activity",
    "Identity theft report",
    "Fraudulent policy report",
    "Unauthorized changes report",
    "Suspicious document submission",
  ],
  "agent-request": [
    "New agent assignment request",
    "Agent contact information needed",
    "Schedule agent consultation",
    "Local agent office inquiry",
    "Agent availability check",
  ],
}

const getDescription = (category: Category) => {
  return faker.helpers.arrayElement(descriptions[category])
}

// Generate tickets
const tickets = Array.from({ length: 100 }, () => {
  const category = faker.helpers.arrayElement(categoryTypes).value as Category
  const policyType = faker.helpers.arrayElement(policyTypes).value as PolicyType

  return {
    status: faker.helpers.arrayElement(statusOptions),
    created: faker.date
      .between({
        from: "2024-09-01T00:00:00Z",
        to: "2024-10-31T23:59:59Z",
      })
      .toISOString(),
    description: getDescription(category),
    priority: faker.helpers.arrayElement(priorities).value,
    category,
    type: getTicketType(),
    duration: getRandomDuration(),
    policyNumber: generatePolicyNumber(policyType),
    policyType,
  }
})

// Sort tickets by creation date (newest first)
const sortedTickets = tickets.sort(
  (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
)

// Write to file
fs.writeFileSync(
  path.join(__dirname, "tickets.ts"),
  `import { Ticket } from "./schema";\n\nexport const tickets: Ticket[] = ${JSON.stringify(
    sortedTickets,
    null,
    2,
  )};`,
)

console.log("Data generated")
