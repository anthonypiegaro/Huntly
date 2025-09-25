"use client"

import { Table } from "@tanstack/react-table"
import { Hammer } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { Fit } from "./columns"
import { createBulkApps } from "./create-bulk-apps.action"

export function BulkActionsDropdown({
  table,
  buttonClassName,
  disabled,
  onBulkTrackSuccess
}: {
  table: Table<Fit>
  buttonClassName?: string
  disabled: boolean
  onBulkTrackSuccess: (ids: string[]) => void
}) {

  const bulkTrackApps = async () => {
    const fitRows = table.getSelectedRowModel().rows.map(row => ({
      id: row.original.id,
      role: row.original.role,
      company: row.original.company,
      resumeId: row.original.resume.id,
      location: row.original.location,
      applicationUrl: row.original.applicationUrl,
      jobDescription: row.original.jobDescription
    }))

    const ids = fitRows.map(row => row.id)

    const data = createBulkApps(fitRows)

    toast.promise(data, {
      loading: "...Loading",
      success: data => {
        table.resetRowSelection()
        onBulkTrackSuccess(ids)
        return `Tracked ${ids.length} applications`
      },
      error: e => e.message
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled} className={buttonClassName}>
          <Hammer />
          Bulk Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={bulkTrackApps}>Track Apps</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}