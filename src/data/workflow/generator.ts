import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import { departments } from "./schema"

const generateDepartmentStats = (totalCases: number) => {
  // Distribute total cases across departments with some randomization
  const departmentData = departments.map((dept) => {
    // Allocate a portion of total cases to each department
    const deptTotalCases = Math.round(
      totalCases * faker.number.float({ min: 0.1, max: 0.25 }),
    )

    const testedCases = Math.round(
      deptTotalCases *
        faker.number.float({
          min: 0.31,
          max: 0.36,
        }),
    )

    const untestedCases = deptTotalCases - testedCases

    const errorFreeCases = Math.round(
      testedCases *
        faker.number.float({
          min: 0.85,
          max: 0.92,
        }),
    )

    const correctedCases = testedCases - errorFreeCases

    return {
      department: dept.value,
      department_label: dept.label,
      total_cases: deptTotalCases,
      tested_cases: testedCases,
      untested_cases: untestedCases,
      error_free_cases: errorFreeCases,
      corrected_cases: correctedCases,
    }
  })

  return departmentData
}

const workflowStats = Array.from({ length: 1 }, () => {
  const totalCases = faker.number.int({ min: 8000, max: 12000 })

  return {
    id: faker.string.uuid(),
    total_cases: totalCases,
    department_stats: generateDepartmentStats(totalCases),
  }
})

fs.writeFileSync(
  path.join(__dirname, "workflow-data.ts"),
  `import { WorkflowStats } from "./schema";\n\nexport const workflowStats: WorkflowStats[] = ${JSON.stringify(
    workflowStats,
    null,
    2,
  )};`,
)

console.log("Data generated")
