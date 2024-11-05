"use client"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/Drawer"
import { RadioCardGroup, RadioCardItem } from "@/components/RadioCardGroup"
import {
  Select,
  SelectContent,
  SelectItemExtended,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import {
  categoryTypes,
  policyTypes,
  priorities,
  ticketTypes,
  type Category,
  type PolicyType,
  type Ticket,
} from "@/data/support/schema"
import React from "react"
import { Input } from "../Input"
import { Label } from "../Label"
import { Textarea } from "../Textarea"

type TicketFormData = Partial<Ticket>

interface TicketDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormPageProps {
  formData: TicketFormData
  onUpdateForm: (updates: Partial<TicketFormData>) => void
}

const SummaryItem = ({
  label,
  value,
}: {
  label: string
  value: string | number | null | undefined
}) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </p>
    <p className="text-sm">{value ?? "Not provided"}</p>
  </div>
)

const FormField = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div>
    <Label className="font-medium">{label}</Label>
    <div className="mt-2">{children}</div>
  </div>
)

const FirstPage = ({ formData, onUpdateForm }: FormPageProps) => (
  <>
    <DrawerHeader>
      <DrawerTitle>
        <p>Create Support Ticket</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
          Ticket Type & Category
        </span>
      </DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="-mx-6 space-y-6 overflow-y-scroll border-t border-gray-200 px-6 dark:border-gray-800">
      <FormField label="Contact Type">
        <RadioCardGroup
          defaultValue={formData.type}
          className="grid grid-cols-2 gap-2 text-sm"
          onValueChange={(value) => onUpdateForm({ type: value })}
        >
          {ticketTypes.map((type) => (
            <RadioCardItem
              key={type.value}
              value={type.value}
              className="flex flex-col justify-start p-2.5 text-base duration-75 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:border-transparent data-[state=checked]:bg-blue-500 data-[state=checked]:text-white sm:text-sm dark:focus:ring-blue-500"
            >
              {type.name}
              <span className="block text-sm opacity-75 sm:text-xs">
                {type.extended}
              </span>
            </RadioCardItem>
          ))}
        </RadioCardGroup>
      </FormField>

      <FormField label="Category">
        <Select
          value={formData.category}
          onValueChange={(value: Category) => onUpdateForm({ category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryTypes.map((category) => (
              <SelectItemExtended
                key={category.value}
                value={category.value}
                option={category.name}
                description={category.description}
              />
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Policy Type">
        <Select
          value={formData.policyType}
          onValueChange={(value: PolicyType) =>
            onUpdateForm({ policyType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Policy Type" />
          </SelectTrigger>
          <SelectContent>
            {policyTypes.map((type) => (
              <SelectItemExtended
                key={type.value}
                value={type.value}
                option={type.name}
                description={type.description}
              />
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Policy Number">
        <Input
          disabled
          name="policyNumber"
          value={formData.policyNumber}
          onChange={(e) => onUpdateForm({ policyNumber: e.target.value })}
          placeholder="Auto generated"
        />
      </FormField>
    </DrawerBody>
  </>
)

const SecondPage = ({ formData, onUpdateForm }: FormPageProps) => (
  <>
    <DrawerHeader>
      <DrawerTitle>
        <p>Ticket Details</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
          Priority & Description
        </span>
      </DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="-mx-6 space-y-6 overflow-y-scroll border-t border-gray-200 px-6 dark:border-gray-800">
      <FormField label="Priority Level">
        <RadioCardGroup
          defaultValue={formData.priority}
          className="grid grid-cols-1 gap-2 text-sm"
          onValueChange={(value) => onUpdateForm({ priority: value })}
        >
          {priorities.map((priority) => (
            <RadioCardItem
              key={priority.value}
              value={priority.value}
              className="p-2.5 text-base duration-75 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:border-transparent data-[state=checked]:bg-blue-500 data-[state=checked]:text-white sm:text-sm dark:focus:ring-blue-500"
            >
              <div className="flex items-center justify-between">
                <span>{priority.label}</span>
                <span className="text-sm opacity-75 sm:text-xs">
                  SLA: {priority.sla}
                </span>
              </div>
              <span className="block text-sm opacity-75 sm:text-xs">
                {priority.description}
              </span>
            </RadioCardItem>
          ))}
        </RadioCardGroup>
      </FormField>

      <FormField label="Description">
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => onUpdateForm({ description: e.target.value })}
          placeholder="Detailed description of the issue..."
          className="h-32"
        />
      </FormField>

      <FormField label="Expected Call Duration (minutes)">
        <Input
          name="duration"
          type="number"
          value={formData.duration || ""}
          onChange={(e) => {
            onUpdateForm({ duration: e.target.value || null })
          }}
          placeholder="0"
          min="0"
        />
      </FormField>
    </DrawerBody>
  </>
)

const SummaryPage = ({ formData }: { formData: TicketFormData }) => (
  <>
    <DrawerHeader>
      <DrawerTitle>
        <p>Review Ticket</p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
          Please review all details before submitting
        </span>
      </DrawerTitle>
    </DrawerHeader>
    <DrawerBody className="-mx-6 space-y-4 overflow-y-scroll border-t border-gray-200 px-6 dark:border-gray-800">
      <div className="rounded-md border border-gray-200 dark:border-gray-800">
        <div className="border-b border-gray-200 p-4 dark:border-gray-800">
          <h3 className="font-medium">Ticket Information</h3>
          <div className="mt-4 space-y-4">
            <SummaryItem
              label="Type"
              value={
                ticketTypes.find((t) => t.value === formData.type)?.name ??
                undefined
              }
            />
            <SummaryItem
              label="Category"
              value={
                categoryTypes.find((c) => c.value === formData.category)
                  ?.name ?? undefined
              }
            />
            <SummaryItem
              label="Policy Type"
              value={
                policyTypes.find((p) => p.value === formData.policyType)
                  ?.name ?? undefined
              }
            />
            <SummaryItem
              label="Priority"
              value={
                priorities.find((p) => p.value === formData.priority)?.label ??
                undefined
              }
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">Details</h3>
          <div className="mt-4 space-y-4">
            <SummaryItem
              label="Priority"
              value={
                priorities.find((p) => p.value === formData.priority)?.label ??
                undefined
              }
            />
            <SummaryItem
              label="Description"
              value={formData.description || undefined}
            />
            <SummaryItem
              label="Call Duration"
              value={
                formData.duration
                  ? `${formData.duration} minute${formData.duration === "1" ? "" : "s"}`
                  : undefined
              }
            />
            <SummaryItem
              label="Created"
              value={
                formData.created
                  ? new Date(formData.created).toLocaleString()
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </DrawerBody>
  </>
)

export function TicketDrawer({ open, onOpenChange }: TicketDrawerProps) {
  const [formData, setFormData] = React.useState<TicketFormData>({
    status: "in-progress",
    category: categoryTypes[0].value,
    type: ticketTypes[0].value,
    policyType: policyTypes[0].value,
    priority: priorities[0].value,
    description: "",
    policyNumber: "",
    duration: "0",
    created: new Date().toISOString(),
  })

  const [currentPage, setCurrentPage] = React.useState(1)

  const handleUpdateForm = (updates: Partial<TicketFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const handleSubmit = () => {
    console.log("Ticket created:", formData)
    onOpenChange(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <FirstPage formData={formData} onUpdateForm={handleUpdateForm} />
      case 2:
        return (
          <SecondPage formData={formData} onUpdateForm={handleUpdateForm} />
        )
      case 3:
        return <SummaryPage formData={formData} />
      default:
        return null
    }
  }

  const renderFooter = () => {
    if (currentPage === 1) {
      return (
        <>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
          <Button onClick={() => setCurrentPage(2)}>Continue</Button>
        </>
      )
    }
    if (currentPage === 2) {
      return (
        <>
          <Button variant="secondary" onClick={() => setCurrentPage(1)}>
            Back
          </Button>
          <Button onClick={() => setCurrentPage(3)}>Review</Button>
        </>
      )
    }
    return (
      <>
        <Button variant="secondary" onClick={() => setCurrentPage(2)}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Create Ticket</Button>
      </>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="overflow-x-hidden sm:max-w-lg">
        {renderPage()}
        <DrawerFooter className="-mx-6 -mb-2 gap-2 px-6 sm:justify-between">
          {renderFooter()}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
