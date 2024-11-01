import type { CohortsAggregate } from "./schema";

export const cohortsAggregate: CohortsAggregate = {
  "totalCohorts": 10,
  "totalUsers": 25784,
  "aggregateMetrics": {
    "activity": {
      "avgTicketsCreated": 5196,
      "avgTicketsResolved": 4521.9,
      "avgCallsMade": 3020.2,
      "avgChatSessions": 1967,
      "avgEmailInteractions": 2177.2,
      "totalTicketsCreated": 51960,
      "totalTicketsResolved": 45219,
      "ticketResolutionRate": 0.9
    },
    "satisfaction": {
      "avgCsatScore": 86.9,
      "avgNpsScore": 51.2,
      "totalFeedbackResponses": 22919,
      "positiveFeedbackRate": 0.8,
      "negativeFeedbackRate": 0.3
    },
    "performance": {
      "avgResponseTimeMinutes": 7.2,
      "avgHandlingTimeMinutes": 14.1,
      "avgFirstContactResolutionRate": 0.8,
      "avgEscalationRate": 0.1
    },
    "channelDistribution": {
      "phone": 1232,
      "email": 1032,
      "chat": 664,
      "social": 274
    },
    "retention": {
      "averageRetentionByWeek": [
        100,
        59.1,
        42.3,
        30.6,
        18.4,
        13.1,
        8.3,
        4.4,
        2.5,
        0.8
      ],
      "overallRetentionRate": 28
    }
  },
  "commonIssues": [
    {
      "category": "Account Service",
      "totalCount": 1815,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Claim Status",
      "totalCount": 1599,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Coverage Inquiry",
      "totalCount": 1390,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Accident Report",
      "totalCount": 1388,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Fraud Report",
      "totalCount": 1301,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Complaint",
      "totalCount": 1282,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Agent Request",
      "totalCount": 894,
      "avgResolutionRate": 0.9
    },
    {
      "category": "Policy Changes",
      "totalCount": 844,
      "avgResolutionRate": 0.9
    },
    {
      "category": "Billing",
      "totalCount": 482,
      "avgResolutionRate": 0.8
    },
    {
      "category": "Emergency",
      "totalCount": 461,
      "avgResolutionRate": 0.8
    },
    {
      "category": "New Quote",
      "totalCount": 196,
      "avgResolutionRate": 0.9
    },
    {
      "category": "Document Request",
      "totalCount": 195,
      "avgResolutionRate": 0.9
    }
  ]
};