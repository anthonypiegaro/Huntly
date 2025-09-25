"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ScoreDetails } from "./data-table"
import { createSingleApp } from "./create-single-app.action"

export type Fit = {
  id: string
  role: string
  company: string
  resume: {
    id: string
    name: string
  }
  location: string
  applicationUrl: string | null
  jobDescription: string
  score: number
  goodPoints: string[]
  poorPoints: string[]
  tracked: boolean
  createdAt: Date
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit"
})

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
    header: "Created At",
    cell: ({ row }) => <div>{dateFormatter.format(row.getValue("createdAt"))}</div>
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

      const handleViewScoreDetailsClick = () => {
        (table.options.meta as { openScoreDetails: (details: ScoreDetails) => void })
          ?.openScoreDetails({
            score: fit.score,
            goodPoints: fit.goodPoints,
            poorPoints: fit.poorPoints
          })
      }

      const handleTrackApplication = () => {
        (table.options.meta as { updateSingleTrackedValue: (id: string ) => void })
          ?.updateSingleTrackedValue(row.original.id)
        
        const data = createSingleApp(row.original)

        toast.promise(data, {
          loading: "...Loading",
          success: data => `Role with ${row.original.company} is now being tracked in Applications`,
          error: error => error.message
        })
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
            <DropdownMenuItem onClick={handleViewScoreDetailsClick}>View Score Details</DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewJobDescriptionClick}>View Job Description</DropdownMenuItem>
            <DropdownMenuItem onClick={handleTrackApplication}>Track App</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete Fit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
