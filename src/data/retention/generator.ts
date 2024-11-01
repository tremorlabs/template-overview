import { fakerDE_CH as faker } from "@faker-js/faker"
import fs from "fs"
import path from "path"
import { categoryTypes } from "../support/schema"
import {
  CohortRetentionData,
  CohortSummary,
  CohortsAggregate,
  WeekData,
} from "./schema"

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

fs.writeFileSync(
  path.join(__dirname, "cohorts.ts"),
  `import type { CohortRetentionData } from "./schema";\n\nexport const cohorts: CohortRetentionData = ${JSON.stringify(cohortData, null, 2)};`,
)

console.log("Cohort data generated")

const roundToDecimal = (num: number): number => Math.round(num * 10) / 10

function generateCohortsAggregate(
  cohorts: CohortRetentionData,
): CohortsAggregate {
  const cohortEntries = Object.entries(cohorts)
  const totalCohorts = cohortEntries.length

  // Initialize aggregates
  const summary: CohortsAggregate = {
    totalCohorts,
    totalUsers: 0,
    aggregateMetrics: {
      activity: {
        avgTicketsCreated: 0,
        avgTicketsResolved: 0,
        avgCallsMade: 0,
        avgChatSessions: 0,
        avgEmailInteractions: 0,
        totalTicketsCreated: 0,
        totalTicketsResolved: 0,
        ticketResolutionRate: 0,
      },
      satisfaction: {
        avgCsatScore: 0,
        avgNpsScore: 0,
        totalFeedbackResponses: 0,
        positiveFeedbackRate: 0,
        negativeFeedbackRate: 0,
      },
      performance: {
        avgResponseTimeMinutes: 0,
        avgHandlingTimeMinutes: 0,
        avgFirstContactResolutionRate: 0,
        avgEscalationRate: 0,
      },
      channelDistribution: {
        phone: 0,
        email: 0,
        chat: 0,
        social: 0,
      },
      retention: {
        averageRetentionByWeek: [],
        overallRetentionRate: 0,
      },
    },
    commonIssues: [],
  }

  // Aggregate all metrics
  cohortEntries.forEach(([, cohort]) => {
    summary.totalUsers += cohort.size

    // Activity metrics
    summary.aggregateMetrics.activity.totalTicketsCreated +=
      cohort.summary.activity.total_tickets_created
    summary.aggregateMetrics.activity.totalTicketsResolved +=
      cohort.summary.activity.total_tickets_resolved
    summary.aggregateMetrics.activity.avgCallsMade +=
      cohort.summary.activity.total_calls_made
    summary.aggregateMetrics.activity.avgChatSessions +=
      cohort.summary.activity.total_chat_sessions
    summary.aggregateMetrics.activity.avgEmailInteractions +=
      cohort.summary.activity.total_email_interactions

    // Satisfaction metrics
    summary.aggregateMetrics.satisfaction.avgCsatScore +=
      cohort.summary.satisfaction.avg_csat_score
    summary.aggregateMetrics.satisfaction.avgNpsScore +=
      cohort.summary.satisfaction.avg_nps_score
    summary.aggregateMetrics.satisfaction.totalFeedbackResponses +=
      cohort.summary.satisfaction.total_satisfaction_responses

    // Performance metrics
    summary.aggregateMetrics.performance.avgResponseTimeMinutes +=
      cohort.summary.performance.avg_response_time_minutes
    summary.aggregateMetrics.performance.avgHandlingTimeMinutes +=
      cohort.summary.performance.avg_handling_time_minutes
    summary.aggregateMetrics.performance.avgFirstContactResolutionRate +=
      cohort.summary.performance.avg_first_contact_resolution_rate
    summary.aggregateMetrics.performance.avgEscalationRate +=
      cohort.summary.performance.avg_escalation_rate

    // Channel distribution
    Object.entries(cohort.summary.channels).forEach(([channel, count]) => {
      summary.aggregateMetrics.channelDistribution[
        channel as keyof typeof summary.aggregateMetrics.channelDistribution
      ] += count
    })

    // Process retention data
    cohort.weeks.forEach((week, index) => {
      if (!week) return
      if (!summary.aggregateMetrics.retention.averageRetentionByWeek[index]) {
        summary.aggregateMetrics.retention.averageRetentionByWeek[index] = 0
      }
      summary.aggregateMetrics.retention.averageRetentionByWeek[index] +=
        week.percentage
    })

    // Process top issues
    cohort.summary.top_issues.forEach((issue) => {
      const existingIssue = summary.commonIssues.find(
        (i) => i.category === issue.category,
      )
      if (existingIssue) {
        existingIssue.totalCount += issue.count
        existingIssue.avgResolutionRate = roundToDecimal(
          (existingIssue.avgResolutionRate + issue.resolution_rate) / 2,
        )
      } else {
        summary.commonIssues.push({
          category: issue.category,
          totalCount: issue.count,
          avgResolutionRate: roundToDecimal(issue.resolution_rate),
        })
      }
    })
  })

  // Calculate averages with rounding
  const activity = summary.aggregateMetrics.activity
  activity.avgTicketsCreated = roundToDecimal(
    activity.totalTicketsCreated / totalCohorts,
  )
  activity.avgTicketsResolved = roundToDecimal(
    activity.totalTicketsResolved / totalCohorts,
  )
  activity.ticketResolutionRate = roundToDecimal(
    activity.totalTicketsResolved / activity.totalTicketsCreated,
  )
  activity.avgCallsMade = roundToDecimal(activity.avgCallsMade / totalCohorts)
  activity.avgChatSessions = roundToDecimal(
    activity.avgChatSessions / totalCohorts,
  )
  activity.avgEmailInteractions = roundToDecimal(
    activity.avgEmailInteractions / totalCohorts,
  )

  const satisfaction = summary.aggregateMetrics.satisfaction
  satisfaction.avgCsatScore = roundToDecimal(
    satisfaction.avgCsatScore / totalCohorts,
  )
  satisfaction.avgNpsScore = roundToDecimal(
    satisfaction.avgNpsScore / totalCohorts,
  )
  satisfaction.positiveFeedbackRate =
    satisfaction.totalFeedbackResponses > 0
      ? roundToDecimal(
          cohortEntries.reduce(
            (sum, [, cohort]) =>
              sum + cohort.summary.satisfaction.total_positive_feedback,
            0,
          ) / satisfaction.totalFeedbackResponses,
        )
      : 0
  satisfaction.negativeFeedbackRate =
    satisfaction.totalFeedbackResponses > 0
      ? roundToDecimal(
          cohortEntries.reduce(
            (sum, [, cohort]) =>
              sum + cohort.summary.satisfaction.total_negative_feedback,
            0,
          ) / satisfaction.totalFeedbackResponses,
        )
      : 0

  const performance = summary.aggregateMetrics.performance
  performance.avgResponseTimeMinutes = roundToDecimal(
    performance.avgResponseTimeMinutes / totalCohorts,
  )
  performance.avgHandlingTimeMinutes = roundToDecimal(
    performance.avgHandlingTimeMinutes / totalCohorts,
  )
  performance.avgFirstContactResolutionRate = roundToDecimal(
    performance.avgFirstContactResolutionRate / totalCohorts,
  )
  performance.avgEscalationRate = roundToDecimal(
    performance.avgEscalationRate / totalCohorts,
  )

  // Calculate average retention by week with rounding
  summary.aggregateMetrics.retention.averageRetentionByWeek =
    summary.aggregateMetrics.retention.averageRetentionByWeek.map((total) =>
      roundToDecimal(total / totalCohorts),
    )
  summary.aggregateMetrics.retention.overallRetentionRate = roundToDecimal(
    summary.aggregateMetrics.retention.averageRetentionByWeek.reduce(
      (sum, rate) => sum + rate,
      0,
    ) / summary.aggregateMetrics.retention.averageRetentionByWeek.length,
  )

  // Sort common issues by total count
  summary.commonIssues.sort((a, b) => b.totalCount - a.totalCount)

  return summary
}

const cohortsAggregate = generateCohortsAggregate(cohortData)

fs.writeFileSync(
  path.join(__dirname, "cohortsAggregate.ts"),
  `import type { CohortsAggregate } from "./schema";\n\nexport const cohortsAggregate: CohortsAggregate = ${JSON.stringify(cohortsAggregate, null, 2)};`,
)

console.log("Cohort aggregate generated")
