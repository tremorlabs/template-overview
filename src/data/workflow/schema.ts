import { z } from "zod"

export const schemaWorkflowStats = z.object({
  id: z.string().uuid(),
  timestamp: z.string(), // ISO string format
  total_cases: z.number().int().positive(),
  tested_cases: z.number().int().nonnegative(),
  untested_cases: z.number().int().nonnegative(),
  error_free_cases: z.number().int().nonnegative(),
  corrected_cases: z.number().int().nonnegative(),
})

export type WorkflowStats = z.infer<typeof schemaWorkflowStats>

// Mock departments for more realistic data generation
export const departments: { value: string; label: string }[] = [
  {
    value: "customer-service",
    label: "Customer Service",
  },
  {
    value: "technical-support",
    label: "Technical Support",
  },
  {
    value: "billing-support",
    label: "Billing Support",
  },
  {
    value: "claims-processing",
    label: "Claims Processing",
  },
  {
    value: "account-management",
    label: "Account Management",
  },
  {
    value: "sales-support",
    label: "Sales Support",
  },
]
