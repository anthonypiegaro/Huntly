"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Fit } from "./columns"

export function DataTableTrackedFilter({
  table,
}: {
  table: Table<Fit>;
}) {
  const trackedFilter = (table.getColumn("tracked")?.getFilterValue() as boolean[]) ?? []

  const toggleFilter = (value: boolean, checked: boolean) => {
    const next = checked
      ? [...trackedFilter, value]
      : trackedFilter.filter((v) => v !== value)

    table.getColumn("tracked")?.setFilterValue(next.length ? next : undefined)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          Tracked
          {trackedFilter.length !== 2 && (
            <div className="h-2 w-2 rounded-full ring ring-[oklch(0.850_0.120_240)] bg-[oklch(0.650_0.120_240)] absolute top-0 right-0 -translate-y-1/3 translate-x-1/3"/>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuCheckboxItem
          checked={trackedFilter.includes(true)}
          onCheckedChange={(checked) => toggleFilter(true, checked)}
        >
          Tracked
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={trackedFilter.includes(false)}
          onCheckedChange={(checked) => toggleFilter(false, checked)}
        >
          Untracked
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}