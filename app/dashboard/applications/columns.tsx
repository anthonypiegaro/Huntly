"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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
    meta: {
      stringName: "Role"
    }
  },
  {
    accessorKey: "company",
    header: "Company",
    meta: {
      stringName: "Company"
    }
  },
  {
    accessorKey: "location",
    header: "Location",
    meta: {
      stringName: "Location"
    }
  },
  {
    accessorKey: "resume.name",
    header: "Resume",
    cell: ({ row }) => <div className="w-full truncate">{row.original.resume?.name ?? "NA"}</div>,
    meta: {
      stringName: "Resume"
    }
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Added
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dateAdded") === null ? "NA" : dateFormatter.format(row.getValue("dateAdded"))}</div>,
    meta: {
      stringName: "Added"
    }
  },
  {
    accessorKey: "dateApplied",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Applied
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dateApplied") === null ? "NA" : dateFormatter.format(row.getValue("dateApplied"))}</div>,
    meta: {
      stringName: "Applied"
    }
  },
  {
    accessorKey: "dateResponded",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Responded
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dateResponded") === null ? "NA" : dateFormatter.format(row.getValue("dateResponded"))}</div>,
    meta: {
      stringName: "Responded"
    }
  },
  {
    accessorKey: "dateInterviewed",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Interviewed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dateInterviewed") === null ? "NA" : dateFormatter.format(row.getValue("dateInterviewed"))}</div>,
    meta: {
      stringName: "Interviewed"
    }
  },
  {
    accessorKey: "dateAccepted",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Accepted
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dateAccepted") === null ? "NA" : dateFormatter.format(row.getValue("dateAccepted"))}</div>,
    meta: {
      stringName: "Accepted"
    }
  },
  {
    accessorKey: "dateClosed",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Closed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dateClosed") === null ? "NA" : dateFormatter.format(row.getValue("dateClosed"))}</div>,
    meta: {
      stringName: "Closed"
    }
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