"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit"
})

export type Application = {
  id: string
  resume: { id: string, name: string } | null
  role: string
  company: string
  location: string
  jobDescription: string
  applicationUrl: string | null
  dateAdded: Date
  dateApplied: Date | null
  dateResponded: Date | null
  dateInterviewed: Date | null
  dateAccepted: Date | null
  dateClosed: Date | null
}

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "company",
    header: "Company"
  },
  {
    accessorKey: "location",
    header: "Location"
  },
  {
    accessorKey: "resume.name",
    header: "Resume",
    cell: ({ row }) => <div>{row.original.resume?.name ?? "NA"}</div>
  },
  {
    accessorKey: "dateAdded",
    header: "Added",
    cell: ({ row }) => <div>{row.getValue("dateAdded") === null ? "NA" : dateFormatter.format(row.getValue("dateAdded"))}</div>
  },
  {
    accessorKey: "dateApplied",
    header: "Applied",
    cell: ({ row }) => <div>{row.getValue("dateApplied") === null ? "NA" : dateFormatter.format(row.getValue("dateApplied"))}</div>
  },
  {
    accessorKey: "dateResponded",
    header: "Responded",
    cell: ({ row }) => <div>{row.getValue("dateResponded") === null ? "NA" : dateFormatter.format(row.getValue("dateResponded"))}</div>
  },
  {
    accessorKey: "dateInterviewed",
    header: "Interviewed",
    cell: ({ row }) => <div>{row.getValue("dateInterviewed") === null ? "NA" : dateFormatter.format(row.getValue("dateInterviewed"))}</div>
  },
  {
    accessorKey: "dateAccepted",
    header: "Accepted",
    cell: ({ row }) => <div>{row.getValue("dateAccepted") === null ? "NA" : dateFormatter.format(row.getValue("dateAccepted"))}</div>
  },
  {
    accessorKey: "dateClosed",
    header: "Closed",
    cell: ({ row }) => <div>{row.getValue("dateClosed") === null ? "NA" : dateFormatter.format(row.getValue("dateClosed"))}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]