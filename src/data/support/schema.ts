// schema.ts
import { z } from "zod"

export const schemaTickets = z.object({
  created: z.string(),
  status: z.string(),
  description: z.string(),
  priority: z.string(),
  category: z.string(),
  type: z.string(),
  duration: z.string().nullable(), // call duration in minutes
  policyNumber: z.string(),
  policyType: z.string(),
})

export type Ticket = z.infer<typeof schemaTickets>

export const statusOptions = ["resolved", "in-progress", "escalated"] as const
export type Status = (typeof statusOptions)[number]

export const categoryTypes = [
  {
    name: "Accident Report",
    value: "accident-report",
    extended: "Report a new accident or incident",
    description: "File initial accident reports and incidents",
  },
  {
    name: "Emergency",
    value: "emergency",
    extended: "Emergency Assistance Request",
    description: "Immediate help for urgent situations",
  },
  {
    name: "Claim Status",
    value: "claim-status",
    extended: "Check Existing Claim",
    description: "Get updates on ongoing claims",
  },
  {
    name: "Policy Changes",
    value: "policy-changes",
    extended: "Modify Policy Details",
    description: "Update or modify existing policies",
  },
  {
    name: "Coverage Inquiry",
    value: "coverage-inquiry",
    extended: "Coverage Information Request",
    description: "Questions about policy coverage",
  },
  {
    name: "Document Request",
    value: "document-request",
    extended: "Policy Document Service",
    description: "Request insurance documentation",
  },
  {
    name: "Billing",
    value: "billing",
    extended: "Payment & Billing Service",
    description: "Handle payments and billing issues",
  },
  {
    name: "New Quote",
    value: "new-quote",
    extended: "Insurance Quote Request",
    description: "Get quotes for new policies",
  },
  {
    name: "Account Service",
    value: "account-service",
    extended: "Account Management",
    description: "General account-related assistance",
  },
  {
    name: "Complaint",
    value: "complaint",
    extended: "File Complaint",
    description: "Register and handle complaints",
  },
  {
    name: "Fraud Report",
    value: "fraud-report",
    extended: "Report Suspicious Activity",
    description: "Report potential fraud or suspicious claims",
  },
  {
    name: "Agent Request",
    value: "agent-request",
    extended: "Agent Assistance",
    description: "Connect with an insurance agent",
  },
] as const

export const policyTypes = [
  {
    name: "Auto Insurance",
    value: "auto",
    extended: "Vehicle Coverage",
    description: "Coverage for cars, motorcycles, and other vehicles",
  },
  {
    name: "Home Insurance",
    value: "home",
    extended: "Property Coverage",
    description: "Protection for houses and personal property",
  },
  {
    name: "Life Insurance",
    value: "life",
    extended: "Life Coverage",
    description: "Life insurance and related benefits",
  },
  {
    name: "Health Insurance",
    value: "health",
    extended: "Medical Coverage",
    description: "Medical and health-related coverage",
  },
  {
    name: "Business Insurance",
    value: "business",
    extended: "Commercial Coverage",
    description: "Coverage for business and commercial needs",
  },
  {
    name: "Umbrella Insurance",
    value: "umbrella",
    extended: "Extended Coverage",
    description: "Additional liability coverage above standard policies",
  },
] as const

// Update the types to match the new structure
export type Category = (typeof categoryTypes)[number]["value"]
export type PolicyType = (typeof policyTypes)[number]["value"]

// Helper function to get category details
export const getCategoryDetails = (value: Category) => {
  return categoryTypes.find((cat) => cat.value === value)
}

// Helper function to get policy type details
export const getPolicyDetails = (value: PolicyType) => {
  return policyTypes.find((policy) => policy.value === value)
}

export const ticketTypes: {
  name: string
  value: string
  extended: string
}[] = [
  {
    name: "First Notice of Loss",
    value: "fnol",
    extended: "First Notice of Loss Call",
  },
  {
    name: "Policy Service",
    value: "policy",
    extended: "Policy Service Call",
  },
  {
    name: "Claims Status",
    value: "claims",
    extended: "Claims Status Check",
  },
  {
    name: "Emergency",
    value: "emergency",
    extended: "Emergency Assistance",
  },
  {
    name: "Coverage Review",
    value: "coverage",
    extended: "Policy Coverage Discussion",
  },
  {
    name: "Billing Support",
    value: "billing",
    extended: "Payment & Billing Assistance",
  },
]

export const priorities: {
  value: string
  label: string
  sla: string | boolean
  description: string
}[] = [
  {
    value: "emergency",
    label: "Emergency",
    sla: "15m",
    description: "Accidents, injuries, immediate assistance needed",
  },
  {
    value: "high",
    label: "High Priority",
    sla: "4h",
    description: "Coverage issues, policy changes",
  },
  {
    value: "medium",
    label: "Medium Priority",
    sla: "24h",
    description: "General inquiries, documentation requests",
  },
  {
    value: "low",
    label: "Low Priority",
    sla: "48h",
    description: "Information requests, future policy changes",
  },
]
