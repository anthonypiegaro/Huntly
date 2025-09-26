"use client"

import { ColumnDef, FilterFn } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { ScoreDetails, SingleFitDeleteDetails } from "./data-table"
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

const booleanIncludes: FilterFn<Fit> = (row, columnId, filterValue: boolean[]) => {
  const value = row.getValue<boolean>(columnId)
  return filterValue?.includes(value)
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
    header: "Company",
    meta: {
      stringName: "Company"
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: {
      stringName: "Role"
    }
  },
  {
    accessorKey: "resume.name",
    header: "Resume",
    meta: {
      stringName: "Resume"
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button 
        variant="ghost" 
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{dateFormatter.format(row.getValue("createdAt"))}</div>,
    meta: {
      stringName: "Created At"
    }
  },
  {
    accessorKey: "tracked",
    header: "Tracked",
    cell: ({ row }) => {
      const tracked = row.getValue("tracked")
      return (
        <Badge 
          className={cn(
            "px-2",
            tracked ? "bg-green-300/20 border-green-300/80 text-primary/90" : "bg-red-300/20 border-red-300/80 text-primary/90"
          )}
        >
          {tracked ? "Yes" : "No"}
        </Badge>
      )
    },
    filterFn: booleanIncludes,
    meta: {
      stringName: "Tracked"
    }
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
    ),
    meta: {
      stringName: "Score"
    }
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

      const handleDeleteClick = () => {
        (table.options.meta as { openDeleteSingleFitDialog: (details: SingleFitDeleteDetails) => void })
          ?.openDeleteSingleFitDialog({
            id: row.original.id,
            name: row.original.company
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
            <DropdownMenuItem variant="destructive" onClick={handleDeleteClick}>Delete Fit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
