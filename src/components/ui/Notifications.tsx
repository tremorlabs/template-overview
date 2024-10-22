import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { cx, focusRing } from "@/lib/utils"
import { RiNotification2Line } from "@remixicon/react"
import { format, formatDistanceToNow } from "date-fns"
import { Button } from "../Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs"

interface Notification {
  id: string
  message: string
  date: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "msg_j2k4l9m3",
    message:
      "We've updated the navigation to make it easier to find the things you use most.",
    date: "2024-10-17",
    read: false,
  },
  {
    id: "msg_h8n2p5r6",
    message:
      "We're updating our Privacy Policy, effective 16 January 2024. We're also updating our legal terms, effective 29 February 2024, and by keeping your account open after that date, you are agreeing to the updated terms.",
    date: "2023-12-28",
    read: false,
  },
  {
    id: "msg_t7v9w4x2",
    message: "New feature: Dark mode is now available across all platforms.",
    date: "2023-11-30",
    read: false,
  },
  {
    id: "msg_a3b5c7d9",
    message:
      "We're updating our legal terms effective 24 January 2023. By keeping your account open after that date, you are agreeing to the updated terms.",
    date: "2022-11-21",
    read: true,
  },
  {
    id: "msg_e2f4g6h8",
    message:
      "Introducing our new mobile app features for enhanced productivity.",
    date: "2022-09-15",
    read: true,
  },
  {
    id: "msg_k1l3m5n7",
    message: "Security update: We've added two-factor authentication support.",
    date: "2022-07-22",
    read: true,
  },
  {
    id: "msg_p8q2r4s6",
    message: "We're updating our Privacy Policy as of 3rd February 2022",
    date: "2022-01-06",
    read: true,
  },
  {
    id: "msg_u9v1w3x5",
    message: "New collaboration tools are now available in your workspace.",
    date: "2021-11-18",
    read: true,
  },
  {
    id: "msg_y7z9a2b4",
    message: "Platform maintenance scheduled for next weekend.",
    date: "2021-09-30",
    read: true,
  },
  {
    id: "msg_c6d8e1f3",
    message: "Check out our new tutorial series for advanced features.",
    date: "2021-08-15",
    read: true,
  },
  {
    id: "msg_g5h7i9j1",
    message: "Your annual subscription has been renewed successfully.",
    date: "2021-07-01",
    read: true,
  },
  {
    id: "msg_k2l4m6n8",
    message: "Important: Please update your payment information.",
    date: "2021-06-15",
    read: true,
  },
]

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const distance = formatDistanceToNow(date, { addSuffix: true })

  return now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000
    ? distance
    : format(date, "d MMM yyyy")
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { message, date, read } = notification
  return (
    <li className="space-y-1 py-2.5">
      <p>
        {!read && (
          <div
            aria-hidden="true"
            className="mb-px mr-1.5 inline-flex size-2 shrink-0 rounded-full bg-blue-500 sm:text-sm"
          />
        )}
        {message}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-gray-500">{formatDate(date)}</p>
        {!read && (
          <Button className="h-6 px-1.5" variant="light">
            Read
          </Button>
        )}
      </div>
    </li>
  )
}

const NotificationList = ({ showAll = false }: { showAll?: boolean }) => {
  const filteredNotifications = showAll
    ? notifications
    : notifications.filter(({ read }) => !read)

  return (
    <ol
      aria-label="Unread notifications"
      className="flex max-h-96 flex-col divide-y overflow-y-scroll"
    >
      {filteredNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ol>
  )
}

export function Notifications() {
  const unreadCount = notifications.filter(({ read }) => !read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={`Notifications (${unreadCount} unread)`}
          variant="ghost"
          className={cx(
            focusRing,
            "group relative size-9 rounded-full bg-white text-sm text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 data-[state=open]:bg-gray-200/50",
          )}
        >
          {unreadCount > 0 && (
            <div className="absolute right-1.5 top-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
          )}
          <RiNotification2Line
            className="size-5 shrink-0 text-gray-500 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-md px-4">
        <div className="flex items-center justify-between gap-16">
          <h2 className="text-base font-semibold text-gray-900">
            Notifications
          </h2>
          <Button variant="ghost">Mark {unreadCount} as read</Button>
        </div>
        <Tabs defaultValue="unread" className="mt-4">
          <TabsList className="grid w-full grid-cols-2" variant="solid">
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="unread">
              <NotificationList />
            </TabsContent>
            <TabsContent value="all">
              <div className="relative">
                <NotificationList showAll />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white"
                />
              </div>
              <Button variant="secondary" className="mt-2 w-full">
                View all
              </Button>
            </TabsContent>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
