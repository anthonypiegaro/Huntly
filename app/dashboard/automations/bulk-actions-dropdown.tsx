"use client"

import { Hammer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function BulkActionsDropdown({
  buttonClassName,
  disabled
}: {
  buttonClassName?: string
  disabled: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled} className={buttonClassName}>
          <Hammer />
          Bulk Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Track Apps</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}