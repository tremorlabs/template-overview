"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";
import { cx } from "@/lib/utils";
import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";

// Types
interface WeekData {
  percentage: number;
  users: number;
}

interface CohortData {
  date: string;
  initialDownloads: number;
  retention: {
    [key: `week${number}`]: WeekData;
  };
}

const cohortData: CohortData[] = [
  {
    date: "Jun 28",
    initialDownloads: 128,
    retention: {
      week0: { percentage: 100, users: 128 },
      week1: { percentage: 34.0, users: 44 },
      week2: { percentage: 16.5, users: 21 },
      week3: { percentage: 22.8, users: 29 },
      week4: { percentage: 20.4, users: 26 },
      week5: { percentage: 19.7, users: 25 },
      week6: { percentage: 19.7, users: 25 },
      week7: { percentage: 19.4, users: 25 },
      week8: { percentage: 6.6, users: 8 },
      week9: { percentage: 5.5, users: 7 },
      week10: { percentage: 4.7, users: 6 },
    },
  },
  {
    date: "Jul 1",
    initialDownloads: 109,
    retention: {
      week0: { percentage: 100, users: 109 },
      week1: { percentage: 25.7, users: 28 },
      week2: { percentage: 27.9, users: 30 },
      week3: { percentage: 27.1, users: 30 },
      week4: { percentage: 27.1, users: 30 },
      week5: { percentage: 25.1, users: 27 },
      week6: { percentage: 23.3, users: 25 },
      week7: { percentage: 21.4, users: 23 },
      week8: { percentage: 11.0, users: 12 },
      week9: { percentage: 9.2, users: 10 },
      week10: { percentage: 7.3, users: 8 },
    },
  },
  {
    date: "Jul 3",
    initialDownloads: 99,
    retention: {
      week0: { percentage: 100, users: 99 },
      week1: { percentage: 78.4, users: 78 },
      week2: { percentage: 71.3, users: 71 },
      week3: { percentage: 69.5, users: 69 },
      week4: { percentage: 53.3, users: 53 },
      week5: { percentage: 43.8, users: 43 },
      week6: { percentage: 39.3, users: 39 },
      week7: { percentage: 21.3, users: 21 },
      week8: { percentage: 18.3, users: 18 },
      week9: { percentage: 15.3, users: 15 },
      week10: { percentage: 12.2, users: 12 },
    },
  },
  {
    date: "Jul 7",
    initialDownloads: 82,
    retention: {
      week0: { percentage: 100, users: 82 },
      week1: { percentage: 91.3, users: 75 },
      week2: { percentage: 89.3, users: 73 },
      week3: { percentage: 81.2, users: 67 },
      week4: { percentage: 76.9, users: 63 },
      week5: { percentage: 71.2, users: 58 },
      week6: { percentage: 34.3, users: 28 },
      week7: { percentage: 19.5, users: 16 },
      week8: { percentage: 11.2, users: 9 },
      week9: { percentage: 8.5, users: 7 },
      week10: { percentage: 6.1, users: 5 },
    },
  },
  {
    date: "Jul 11",
    initialDownloads: 121,
    retention: {
      week0: { percentage: 100, users: 121 },
      week1: { percentage: 87.3, users: 106 },
      week2: { percentage: 84.7, users: 102 },
      week3: { percentage: 74.4, users: 90 },
      week4: { percentage: 71.3, users: 86 },
      week5: { percentage: 69.3, users: 84 },
      week6: { percentage: 63.4, users: 77 },
      week7: { percentage: 59.3, users: 72 },
      week8: { percentage: 23.2, users: 28 },
      week9: { percentage: 19.8, users: 24 },
      week10: { percentage: 16.5, users: 20 },
    },
  },
  {
    date: "Jul 15",
    initialDownloads: 142,
    retention: {
      week0: { percentage: 100, users: 142 },
      week1: { percentage: 88.3, users: 125 },
      week2: { percentage: 81.7, users: 116 },
      week3: { percentage: 73.4, users: 104 },
      week4: { percentage: 45.2, users: 64 },
      week5: { percentage: 38.1, users: 54 },
      week6: { percentage: 23.8, users: 34 },
      week7: { percentage: 12.2, users: 17 },
      week8: { percentage: 9.1, users: 13 },
      week9: { percentage: 7.0, users: 10 },
      week10: { percentage: 5.6, users: 8 },
    },
  },
  {
    date: "Jul 19",
    initialDownloads: 135,
    retention: {
      week0: { percentage: 100, users: 135 },
      week1: { percentage: 91.1, users: 123 },
      week2: { percentage: 85.2, users: 115 },
      week3: { percentage: 77.8, users: 105 },
      week4: { percentage: 70.4, users: 95 },
      week5: { percentage: 63.0, users: 85 },
      week6: { percentage: 55.6, users: 75 },
      week7: { percentage: 48.1, users: 65 },
      week8: { percentage: 40.7, users: 55 },
      week9: { percentage: 33.3, users: 45 },
      week10: { percentage: 25.9, users: 35 },
    },
  },
];

// Helper functions
const getWeeks = (data: CohortData[]): string[] => {
  return Object.keys(data[0].retention).sort((a, b) =>
    parseInt(a.replace('week', '')) - parseInt(b.replace('week', ''))
  );
};

const getAllPercentages = (data: CohortData[]): number[] => {
  return data.flatMap(cohort =>
    Object.values(cohort.retention).map(week => week.percentage)
  );
};

const colorClasses = [
  "bg-gray-200/70 dark:bg-gray-800",
  "bg-gray-100 dark:bg-gray-900",
  "bg-blue-50 dark:bg-blue-950",
  "bg-blue-100 dark:bg-blue-900",
  "bg-blue-200 dark:bg-blue-800",
  "bg-blue-300 dark:bg-blue-700",
  "bg-blue-400 dark:bg-blue-600",
  "bg-blue-500 dark:bg-blue-500",
];

const getBackgroundColor = (value: number, minValue: number, maxValue: number) => {
  const normalizedValue = (value - minValue) / (maxValue - minValue)
  const index = Math.min(
    Math.floor(normalizedValue * colorClasses.length),
    colorClasses.length - 1,
  )
  return colorClasses[index]
}

const getTextColor = (value: number, minValue: number, maxValue: number) => {
  const normalizedValue = (value - minValue) / (maxValue - minValue)
  return normalizedValue > 0.6
    ? "text-white dark:text-white"
    : "text-gray-900 dark:text-gray-50"
}

export default function Heatmap() {
  const weeks = getWeeks(cohortData);
  const allValues = getAllPercentages(cohortData);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  return (
    <main className="mt-6">
      <TableRoot className="overflow-scroll">
        <Table className="border-separate border-spacing-0 text-sm tabular-nums">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="sticky top-0 w-56 whitespace-nowrap bg-white left-0 z-20 border-r border-gray-200 dark:border-gray-800 pr-4 dark:bg-gray-950">
                <span className="block">Day of Download</span>
                <span className="block font-normal text-gray-500 dark:text-gray-500">
                  Initial users
                </span>
              </TableHeaderCell>
              {weeks.map((week) => (
                <TableHeaderCell
                  key={week}
                  className="border-r border-gray-200 dark:border-gray-800"
                >
                  <span>Week {week.replace('week', '')}</span>
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cohortData.map((cohort) => (
              <TableRow key={cohort.date}>
                <TableCell className="sticky left-0 z-10 min-w-56 border-r border-gray-200 bg-white px-2.5 dark:border-gray-800 dark:bg-gray-950">
                  <Link
                    className="group flex items-start justify-between"
                    href="#"
                  >
                    <div>
                      <span className="block text-sm font-medium text-gray-900 dark:text-gray-50">
                        {cohort.date}
                      </span>
                      <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-500">
                        {cohort.initialDownloads}K users
                      </span>
                    </div>
                    <RiArrowRightUpLine
                      className="size-4 shrink-0 text-gray-400 transition-all group-hover:text-gray-700 dark:text-gray-600 group-hover:dark:text-gray-300"
                      aria-hidden="true"
                    />
                  </Link>
                </TableCell>
                {weeks.map((week) => {
                  const weekData = cohort.retention[week as keyof typeof cohort.retention];
                  return (
                    <TableCell
                      key={week}
                      className={cx(
                        getBackgroundColor(weekData.percentage, minValue, maxValue),
                        getTextColor(weekData.percentage, minValue, maxValue),
                        "min-w-32 border-b border-r border-gray-200 dark:border-gray-800"
                      )}
                    >
                      <span className="block text-sm font-medium">
                        {weekData.percentage}%
                      </span>
                      <span
                        className={cx(
                          getTextColor(weekData.percentage, minValue, maxValue),
                          "mt-0.5 block text-sm"
                        )}
                      >
                        {weekData.users}K
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </main>
  );
}