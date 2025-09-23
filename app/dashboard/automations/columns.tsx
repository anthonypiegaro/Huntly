"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Fit = {
  id: string
  role: string
  company: string
  resume: {
    id: string
    name: string
  }
  jobDescription: string
  score: number
  goodPoints: string[]
  poorPoints: string[]
  tracked: boolean
  createdAt: Date
}

export const columns: ColumnDef<Fit>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: "Company"
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "resume.name",
    header: "Resume"
  },
  {
    accessorKey: "createdAt",
    header: "Created At"
  },
  {
    accessorKey: "tracked",
    header: "Tracked"
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Score
        <ArrowUpDown />
      </Button>
    )
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const fit = row.original

      const handleViewJobDescriptionClick = () => {
        (table.options.meta as { openJobDescription: (jd: string) => void })
          ?.openJobDescription(fit.jobDescription)
      }
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Score Details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewJobDescriptionClick}>View Job Description</DropdownMenuItem>
            <DropdownMenuItem>Track App</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete Fit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
