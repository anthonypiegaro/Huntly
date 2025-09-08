"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

import { LandingPageApplication } from "../data"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit"
})

export const columns: ColumnDef<LandingPageApplication>[] = [
  {
    id: "select",
    header: () => (
      <Checkbox />
    ),
    cell: () => (
      <Checkbox />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateAdded",
    header: () => <div className="flex items-center">Added <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{dateFormatter.format(row.getValue("dateAdded"))}</div>
  },
  {
    accessorKey: "jobTitle",
    header: () => <div className="flex items-center">Title <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("jobTitle")}</div>
  },
  {
    accessorKey: "company",
    header: () => <div className="flex items-center">Company <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("company")}</div>
  },
  {
    accessorKey: "location",
    header: () => <div className="flex items-center">Location <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("company")}</div>
  },
  {
    accessorKey: "dateApplied",
    header: () => <div className="flex items-center">Applied <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("dateApplied") === null ? "NA" : dateFormatter.format(row.getValue("dateApplied"))}</div>
  },
  {
    accessorKey: "dateResponded",
    header: () => <div className="flex items-center">Responded <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("dateResponded") === null ? "NA" : dateFormatter.format(row.getValue("dateResponded"))}</div>
  },
  {
    accessorKey: "dateInterviewed",
    header: () => <div className="flex items-center">Interviewed <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("dateInterviewed") === null ? "NA" : dateFormatter.format(row.getValue("dateInterviewed"))}</div>
  },
  {
    accessorKey: "dateAccepted",
    header: () => <div className="flex items-center">Accepted <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("dateAccepted") === null ? "NA" : dateFormatter.format(row.getValue("dateAccepted"))}</div>
  },
  {
    accessorKey: "dateClosed",
    header: () => <div className="flex items-center">Closed <ArrowUpDown className="ml-2 h-4 w-4" /></div>,
    cell: ({ row }) => <div>{row.getValue("dateClosed") === null ? "NA" : dateFormatter.format(row.getValue("dateClosed"))}</div>
  }
]