import { z } from "zod"

export const schemaTransactions = z.object({
  created: z.string(),
  status: z.string(),
  description: z.string(),
  additional: z.string(),
  iconType: z.string(),
  type: z.string(),
  amount: z.string().nullable(),
})

export type Transaction = z.infer<typeof schemaTransactions>
