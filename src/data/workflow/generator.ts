import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"

const workflowStats = Array.from({ length: 90 }, () => {
  // Generate base numbers matching real-world proportions
  const totalCases = faker.number.int({ min: 8000, max: 12000 })
  const testedCases = Math.round(
    totalCases *
      faker.number.float({
        min: 0.31,
        max: 0.36,
      }),
  )
  const untestedCases = totalCases - testedCases

  // Generate error free and corrected cases
  const errorFreeCases = Math.round(
    testedCases *
      faker.number.float({
        min: 0.85,
        max: 0.92,
      }),
  )
  const correctedCases = testedCases - errorFreeCases

  // Generate a date within the last 90 days
  const date = faker.date.between({
    from: "2024-08-01T00:00:00Z",
    to: "2024-10-29T00:00:00Z",
  })

  return {
    id: faker.string.uuid(),
    timestamp: date.toISOString(),
    total_cases: totalCases,
    tested_cases: testedCases,
    untested_cases: untestedCases,
    error_free_cases: errorFreeCases,
    corrected_cases: correctedCases,
  }
})

// Ensure the data is sorted by timestamp
workflowStats.sort(
  (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
)

fs.writeFileSync(
  path.join(__dirname, "workflow-data.ts"),
  `import { WorkflowStats } from "./schema";\n\nexport const workflowStats: WorkflowStats[] = ${JSON.stringify(workflowStats, null, 2)};`,
)
