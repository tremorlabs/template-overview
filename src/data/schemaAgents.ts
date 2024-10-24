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

export const accounts: { value: string; label: string }[] = [
  {
    value: "auto-insurance",
    label: "Auto Insurance",
  },
  {
    value: "business-liability",
    label: "Business Liability",
  },
  {
    value: "commercial-property",
    label: "Commercial Property",
  },
  {
    value: "cyber-insurance",
    label: "Cyber Insurance",
  },
  {
    value: "dental-coverage",
    label: "Dental Coverage",
  },
  {
    value: "disability-insurance",
    label: "Disability Insurance",
  },
  {
    value: "employee-benefits",
    label: "Employee Benefits",
  },
  {
    value: "equipment-insurance",
    label: "Equipment Insurance",
  },
  {
    value: "fire-insurance",
    label: "Fire Insurance",
  },
  {
    value: "flood-insurance",
    label: "Flood Insurance",
  },
  {
    value: "general-liability",
    label: "General Liability",
  },
  {
    value: "health-insurance",
    label: "Health Insurance",
  },
  {
    value: "homeowners-insurance",
    label: "Homeowners Insurance",
  },
  {
    value: "life-insurance",
    label: "Life Insurance",
  },
  {
    value: "marine-insurance",
    label: "Marine Insurance",
  },
  {
    value: "medical-malpractice",
    label: "Medical Malpractice",
  },
  {
    value: "pet-insurance",
    label: "Pet Insurance",
  },
  {
    value: "professional-liability",
    label: "Professional Liability",
  },
  {
    value: "property-insurance",
    label: "Property Insurance",
  },
  {
    value: "renters-insurance",
    label: "Renters Insurance",
  },
  {
    value: "travel-insurance",
    label: "Travel Insurance",
  },
  {
    value: "vision-coverage",
    label: "Vision Coverage",
  },
]
