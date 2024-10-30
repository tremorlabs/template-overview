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

export const paymentOptions: {
  name: string
  value: string
  extended: string
}[] = [
  {
    name: "ACH",
    value: "ach",
    extended: "ACH transfer",
  },
  {
    name: "Wire",
    value: "wire",
    extended: "Wire transfer",
  },
  {
    name: "Check",
    value: "check",
    extended: "Check",
  },
  {
    name: "RTP",
    value: "rtp",
    extended: "RTP transfer",
  },
]

export const destinations: {
  value: string
  label: string
  category: string | boolean
}[] = [
  {
    value: "manually",
    label: "Enter details manually",
    category: false,
  },
  {
    value: "deel",
    label: "Deel",
    category: "US Bank",
  },
  {
    value: "gusto",
    label: "Gusto",
    category: "Chase Bank",
  },
  {
    value: "stuart-little",
    label: "Stuart Little",
    category: "Wells Fargo Bank",
  },
  {
    value: "wilmer-lawyers",
    label: "Wilmer Lawyers",
    category: "Citi Bank",
  },
  {
    value: "forest-lawyers-group",
    label: "Forest Lawyer Group",
    category: "UBS Bank",
  },
]
