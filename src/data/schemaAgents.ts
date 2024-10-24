import { z } from "zod"

export const schemaAgents = z.object({
  agent_id: z.string(),
  full_name: z.string(),
  account: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  number: z.string(),
  email: z.string(),
  registered: z.boolean(),
  minutes_called: z.number(),
  minutes_booked: z.number(),
  ticket_generation: z.boolean(),
})

export type Agent = z.infer<typeof schemaAgents>

export const accounts = [
  "Auto Insurance",
  "Business Liability",
  "Commercial Property",
  "Cyber Insurance",
  "Dental Coverage",
  "Disability Insurance",
  "Employee Benefits",
  "Equipment Insurance",
  "Fire Insurance",
  "Flood Insurance",
  "General Liability",
  "Health Insurance",
  "Homeowners Insurance",
  "Life Insurance",
  "Marine Insurance",
  "Medical Malpractice",
  "Pet Insurance",
  "Professional Liability",
  "Property Insurance",
  "Renters Insurance",
  "Travel Insurance",
  "Vision Coverage",
]
