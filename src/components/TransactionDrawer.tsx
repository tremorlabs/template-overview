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
import {
    RadioCardGroup,
    RadioCardItem
} from "@/components/RadioCardGroup"
import {
    Select,
    SelectContent,
    SelectItemExtended,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import { destinations, paymentOptions } from "@/data/overview/data"
import { cx } from "@/lib/utils"
import React from "react"
import { Checkbox } from "./Checkbox"
import { Input } from "./Input"
import { Label } from "./Label"

interface DataTableDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function TransactionDrawer({
    open,
    onOpenChange,
}: DataTableDrawerProps) {
    const [formData, setFormData] = React.useState({
        method: paymentOptions[0].value,
        destination: "manually", // Initialize with the same value as selectedDestination
        accountNumber: "",
        routingNumber: "",
        statementDescriptor: "",
        saveDetails: false,
        amount: "",
        memo: "",
        scheduledDate: "",
    })
    const [currentPage, setCurrentPage] = React.useState(1)

    const handleDestinationChange = (value: string) => {
        setFormData(prev => ({ ...prev, destination: value }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleContinue = () => {
        setCurrentPage(currentPage + 1)
    }

    const handleBack = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleSubmit = () => {
        console.log('Form submitted:', formData)
        onOpenChange(false)
    }

    const SummaryItem = ({ label, value }: { label: string; value: string | boolean }) => (
        <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-sm">{
                typeof value === 'boolean'
                    ? value ? 'Yes' : 'No'
                    : value || 'Not provided'
            }</p>
        </div>
    )

    const FirstPage = () => (
        <>
            <DrawerHeader>
                <DrawerTitle>
                    <p>Send money</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-500">Add recipient info</span>
                </DrawerTitle>
            </DrawerHeader>
            <DrawerBody className="space-y-6 border-t border-gray-200 dark:border-gray-800 -mx-6 px-6">
                <fieldset className="space-y-3">
                    <legend className="text-sm font-medium">Method</legend>
                    <RadioCardGroup
                        defaultValue={formData.method}
                        className="text-sm flex items-center gap-2"
                        onValueChange={(value) => setFormData(prev => ({ ...prev, method: value }))}
                    >
                        {paymentOptions.map((option) => (
                            <RadioCardItem
                                key={option.value}
                                value={option.value}
                                className={cx(
                                    "p-2.5",
                                    "data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-transparent"
                                )}
                            >
                                {option.name}
                            </RadioCardItem>
                        ))}
                    </RadioCardGroup>
                </fieldset>

                <div>
                    <Label htmlFor="destination" className="font-medium">Destination</Label>
                    <Select onValueChange={handleDestinationChange}>
                        <SelectTrigger id="destination" name="destination" className="mt-2">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {destinations.map((item) => (
                                <SelectItemExtended
                                    key={item.value}
                                    value={item.value}
                                    option={item.label}
                                    description={item.category}
                                />
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="accountNumber" className="font-medium">Account number</Label>
                    <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="12345678"
                        disabled={formData.destination !== "manually"}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="routingNumber" className="font-medium">Routing number</Label>
                    <Input
                        id="routingNumber"
                        name="routingNumber"
                        value={formData.routingNumber}
                        onChange={handleInputChange}
                        placeholder="12345678"
                        disabled={formData.destination !== "manually"}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="statementDescriptor" className="font-medium">Statement descriptor</Label>
                    <Input
                        id="statementDescriptor"
                        name="statementDescriptor"
                        value={formData.statementDescriptor}
                        onChange={handleInputChange}
                        placeholder="For recipient"
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="saveDetails"
                        name="saveDetails"
                        checked={formData.saveDetails}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saveDetails: checked as boolean }))}
                    />
                    <Label htmlFor="saveDetails" className="font-medium">Save details to reuse later</Label>
                </div>
            </DrawerBody>
        </>
    )

    const SecondPage = () => (
        <>
            <DrawerHeader>
                <DrawerTitle>
                    <p>Transaction Details</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-500">Set amount and timing</span>
                </DrawerTitle>
            </DrawerHeader>
            <DrawerBody className="space-y-6 border-t border-gray-200 dark:border-gray-800 -mx-6 px-6 overflow-y-scroll">
                <div>
                    <Label htmlFor="amount" className="font-medium">Amount</Label>
                    <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="memo" className="font-medium">Memo</Label>
                    <Input
                        id="memo"
                        name="memo"
                        value={formData.memo}
                        onChange={handleInputChange}
                        placeholder="Optional memo"
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="scheduledDate" className="font-medium">Scheduled Date</Label>
                    <Input
                        id="scheduledDate"
                        name="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={handleInputChange}
                        className="mt-2"
                    />
                </div>
            </DrawerBody>
        </>
    )

    const SummaryPage = () => {
        const getDestinationLabel = () => {
            const dest = destinations.find(d => d.value === formData.destination)
            return dest ? `${dest.label}${dest.category ? ` (${dest.category})` : ''}` : formData.destination
        }

        const getMethodLabel = () => {
            const method = paymentOptions.find(o => o.value === formData.method)
            return method ? method.name : formData.method
        }

        return (
            <>
                <DrawerHeader>
                    <DrawerTitle>
                        <p>Review Transaction</p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-500">
                            Please review all details before submitting
                        </span>
                    </DrawerTitle>
                </DrawerHeader>
                <DrawerBody className="space-y-6 border-t border-gray-200 dark:border-gray-800 -mx-6 px-6 overflow-y-scroll">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="font-medium">Recipient Information</h3>
                            <div className="mt-4 space-y-4">
                                <SummaryItem label="Payment Method" value={getMethodLabel()} />
                                <SummaryItem label="Destination" value={getDestinationLabel()} />
                                <SummaryItem label="Account Number" value={formData.accountNumber} />
                                <SummaryItem label="Routing Number" value={formData.routingNumber} />
                                <SummaryItem label="Statement Descriptor" value={formData.statementDescriptor} />
                                <SummaryItem label="Save Details" value={formData.saveDetails} />
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium">Transaction Details</h3>
                            <div className="mt-4 space-y-4">
                                <SummaryItem
                                    label="Amount"
                                    value={formData.amount ? `$${parseFloat(formData.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : 'Not provided'}
                                />
                                <SummaryItem label="Memo" value={formData.memo} />
                                <SummaryItem
                                    label="Scheduled Date"
                                    value={formData.scheduledDate ? new Date(formData.scheduledDate).toLocaleDateString() : 'Not provided'}
                                />
                            </div>
                        </div>
                    </div>
                </DrawerBody>
            </>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="overflow-x-hidden sm:max-w-lg dark:bg-gray-925">
                {currentPage === 1 && <FirstPage />}
                {currentPage === 2 && <SecondPage />}
                {currentPage === 3 && <SummaryPage />}

                <DrawerFooter className="-mx-6 -mb-2 gap-2 bg-white px-6 dark:bg-gray-925 sm:justify-between">
                    {currentPage === 1 ? (
                        <>
                            <DrawerClose>
                                <Button variant="secondary">
                                    Cancel
                                </Button>
                            </DrawerClose>
                            <Button onClick={handleContinue}>
                                Continue
                            </Button>
                        </>
                    ) : currentPage === 2 ? (
                        <>
                            <Button variant="secondary" onClick={handleBack}>
                                Back
                            </Button>
                            <Button onClick={handleContinue}>
                                Review
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary" onClick={handleBack}>
                                Back
                            </Button>
                            <Button onClick={handleSubmit}>
                                Submit Transaction
                            </Button>
                        </>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}