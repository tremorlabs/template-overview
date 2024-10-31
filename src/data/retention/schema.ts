export interface ActivitySummary {
  total_tickets_created: number
  total_tickets_resolved: number
  total_calls_made: number
  total_chat_sessions: number
  total_email_interactions: number
}

export interface SatisfactionMetrics {
  avg_csat_score: number
  avg_nps_score: number
  total_satisfaction_responses: number
  total_positive_feedback: number
  total_negative_feedback: number
}

export interface PerformanceMetrics {
  avg_response_time_minutes: number
  avg_handling_time_minutes: number
  avg_first_contact_resolution_rate: number
  avg_escalation_rate: number
}

export interface TopIssue {
  category: string
  count: number
  resolution_rate: number
}

export interface ChannelDistribution {
  phone: number
  email: number
  chat: number
  social: number
}

export interface CohortSummary {
  activity: ActivitySummary
  satisfaction: SatisfactionMetrics
  performance: PerformanceMetrics
  top_issues: TopIssue[]
  channels: ChannelDistribution
}

export interface WeekData {
  percentage: number
  count: number
}

export interface CohortData {
  size: number
  dates: {
    start: string
    end: string
  }
  summary: CohortSummary
  weeks: (WeekData | null)[]
}

export type CohortRetentionData = Record<string, CohortData>
