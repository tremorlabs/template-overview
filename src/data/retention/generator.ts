import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import { categoryTypes } from "../support/schema"
import { CohortRetentionData, CohortSummary, WeekData } from "./schema"

const generateDecimal = (
  min: number,
  max: number,
  decimals: number = 1,
): number => {
  const value = faker.number.float({ min, max })
  return Number(value.toFixed(decimals))
}

const generateCohortSummary = (cohortSize: number): CohortSummary => {
  const activeUsers = Math.floor(cohortSize * 0.8) // Assuming 80% average activity

  const total_tickets_created = faker.number.int({
    min: Math.floor(activeUsers * 2), // Increased multiplier for total over time
    max: Math.floor(activeUsers * 3),
  })
  const total_tickets_resolved = faker.number.int({
    min: Math.floor(total_tickets_created * 0.8),
    max: Math.floor(total_tickets_created * 0.95),
  })

  return {
    activity: {
      total_tickets_created,
      total_tickets_resolved,
      total_calls_made: faker.number.int({
        min: Math.floor(activeUsers * 1.2),
        max: Math.floor(activeUsers * 1.8),
      }),
      total_chat_sessions: faker.number.int({
        min: Math.floor(activeUsers * 0.6),
        max: Math.floor(activeUsers * 1.2),
      }),
      total_email_interactions: faker.number.int({
        min: Math.floor(activeUsers * 0.9),
        max: Math.floor(activeUsers * 1.5),
      }),
    },
    satisfaction: {
      avg_csat_score: generateDecimal(75, 95, 1),
      avg_nps_score: generateDecimal(30, 70, 1),
      total_satisfaction_responses: faker.number.int({
        min: Math.floor(total_tickets_resolved * 0.4),
        max: Math.floor(total_tickets_resolved * 0.6),
      }),
      total_positive_feedback: faker.number.int({
        min: Math.floor(activeUsers * 0.6),
        max: Math.floor(activeUsers * 1.2),
      }),
      total_negative_feedback: faker.number.int({
        min: Math.floor(activeUsers * 0.15),
        max: Math.floor(activeUsers * 0.45),
      }),
    },
    performance: {
      avg_response_time_minutes: generateDecimal(2, 15, 1),
      avg_handling_time_minutes: generateDecimal(8, 30, 1),
      avg_first_contact_resolution_rate: generateDecimal(0.65, 0.9, 2),
      avg_escalation_rate: generateDecimal(0.05, 0.2, 2),
    },
    top_issues: Array.from({ length: 3 }, () => {
      const category = faker.helpers.arrayElement(categoryTypes)
      return {
        category: category.name,
        count: faker.number.int({ min: 150, max: 600 }), // Increased for total over time
        resolution_rate: generateDecimal(0.7, 0.95, 2),
      }
    }),
    channels: {
      phone: faker.number.int({ min: 90, max: 150 }), // Increased percentages for total
      email: faker.number.int({ min: 60, max: 120 }),
      chat: faker.number.int({ min: 45, max: 90 }),
      social: faker.number.int({ min: 15, max: 45 }),
    },
  }
}

const generateCohortData = (): CohortRetentionData => {
  const startDate = new Date("2023-09-15")
  const weeksToTrack = 10
  const cohortsToGenerate = 10
  const cohorts: CohortRetentionData = {}

  for (let cohortIndex = 0; cohortIndex < cohortsToGenerate; cohortIndex++) {
    const cohortStartDate = new Date(
      startDate.getTime() + cohortIndex * 7 * 24 * 60 * 60 * 1000,
    )
    const cohortEndDate = new Date(
      cohortStartDate.getTime() + 7 * 24 * 60 * 60 * 1000,
    )
    const cohortSize = faker.number.int({ min: 2000, max: 3000 })

    const cohortKey = cohortStartDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    const weeks: (WeekData | null)[] = []

    for (let week = 0; week < weeksToTrack; week++) {
      if (week >= weeksToTrack - cohortIndex) {
        weeks.push(null)
        continue
      }

      const baseRetention = week === 0 ? 100 : 65 * Math.pow(0.8, week - 1)
      const retention_rate =
        week === 0
          ? 100
          : generateDecimal(baseRetention - 5, baseRetention + 5, 1)

      weeks.push({
        percentage: retention_rate,
        count: Math.floor(cohortSize * (retention_rate / 100)),
      })
    }

    cohorts[cohortKey] = {
      size: cohortSize,
      dates: {
        start: cohortStartDate.toISOString(),
        end: cohortEndDate.toISOString(),
      },
      summary: generateCohortSummary(cohortSize),
      weeks,
    }
  }

  return cohorts
}

const cohortData = generateCohortData()

// Fix the export statement to match CohortRetentionData type
fs.writeFileSync(
  path.join(__dirname, "cohorts.ts"),
  `import type { CohortRetentionData } from "./schema";\n\nexport const cohorts: CohortRetentionData = ${JSON.stringify(cohortData, null, 2)};`,
)

console.log("Cohort data generated")
