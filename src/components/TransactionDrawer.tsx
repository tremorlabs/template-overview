"use client"
import { Button } from "@/components/Button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"

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
import { cx } from "@/lib/utils"
import { Label } from "./Label"


interface DataTableDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const options = [
    {
        name: "ACH",
        value: "ach"
    },
    {
        name: "Wire",
        value: "wire"
    },
    {
        name: "Check",
        value: "check"
    },
    {
        name: "RTP",
        value: "rtp"
    },
]

const destinations = [
    {
        value: "manually",
        label: "Enter details manually",
        category: false
    },
    {
        value: "deel",
        label: "Deel",
        category: "US Bank"
    },
    {
        value: "gusto",
        label: "Gusto",
        category: "Chase Bank"
    },
    {
        value: "stuart-little",
        label: "Stuart Little",
        category: "Wells Fargo Bank"
    },
]


export function TransactionDrawer({
    open,
    onOpenChange,
}: DataTableDrawerProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="overflow-x-hidden sm:max-w-lg dark:bg-gray-925">
                <DrawerHeader>
                    <DrawerTitle>
                        <p>Send money</p>
                        {/* <span>{formatters.currency({ number: datas.amount })}</span> */}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-500">Add recipient info</span>
                    </DrawerTitle>
                </DrawerHeader>
                <DrawerBody className=" space-y-6 border-t border-gray-200 dark:border-gray-800 -mx-6 px-6">
                    <fieldset className="space-y-3">
                        <legend className="text-sm font-medium">
                            Method
                        </legend>
                        <RadioCardGroup defaultValue="1" className="text-sm flex items-center gap-2">
                            {options.map((option) => (
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
                        <Label className="font-medium">Destination</Label>
                        <Select>
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {destinations.map((item) => (
                                    <SelectItem key={item.value} value={item.value} className="flex items-center w-full justify-between">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="font-medium">{item.category}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                </DrawerBody>
                <DrawerFooter className="-mx-6 -mb-2 gap-2 bg-white px-6 dark:bg-gray-925">
                    <DrawerClose>
                        <Button variant="secondary" className="w-full">
                            Dispute
                        </Button>
                    </DrawerClose>
                    <DrawerClose>
                        <Button className="w-full">Submit</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}