import { z } from "zod"

export const departmentSchema = z.object({
  department: z.string(),
  department_label: z.string(),
  total_cases: z.number().int().positive(),
  tested_cases: z.number().int().nonnegative(),
  untested_cases: z.number().int().nonnegative(),
  error_free_cases: z.number().int().nonnegative(),
  corrected_cases: z.number().int().nonnegative(),
})

export const schemaWorkflowStats = z.object({
  id: z.string().uuid(),
  total_cases: z.number().int().positive(),
  department_stats: z.array(departmentSchema),
})

export type WorkflowStats = z.infer<typeof schemaWorkflowStats>
export type DepartmentStats = z.infer<typeof departmentSchema>

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
