"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { Fit } from "./columns"
import { NumberFilter } from "./data-table"

export function DataTableScoreFilter({
  table
}: {
  table: Table<Fit>
}) {
  const { comparator, value } = (table.getColumn("score")?.getFilterValue() as NumberFilter) ?? { comparator: "none", value: 1 }

  const handleComparatorChange = (comparator: NumberFilter["comparator"]) => {
    if (comparator === "none") {
      table.getColumn("score")?.setFilterValue({ comparator, value: 1})
    } else {
      table.getColumn("score")?.setFilterValue({ comparator, value: value})
    }
  }

  const selectValue = (value: NumberFilter["value"]) => {
    table.getColumn("score")?.setFilterValue({ comparator, value })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          Score
          {comparator !== "none" && (
            <div className="h-2 w-2 rounded-full ring ring-[oklch(0.850_0.120_240)] bg-[oklch(0.650_0.120_240)] absolute top-0 right-0 -translate-y-1/3 translate-x-1/3"/>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Select value={comparator} onValueChange={handleComparatorChange}>
          <SelectTrigger className="w-45 my-2 mx-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value=">">Greater Than</SelectItem>
            <SelectItem value="=">Equal To</SelectItem>
            <SelectItem value="<">Less Than</SelectItem>
          </SelectContent>
        </Select>
        <div className={cn("w-50 flex justify-center flex-wrap gap-2", comparator === "none" && "gap-0")}>
          {Array.from({ length: 10 }).map((_, i) => {
            const number = i + 1

            return (
              <div
                key={i}
                className={cn(
                  "w-10 h-8 border flex justify-center items-center text-sm rounded-lg hover:bg-accent/80 cursor-default overflow-hidden transition-all",
                  number === value && "bg-accent hover:bg-accent",
                  comparator === "none" && "h-0 border-0"
                )}
                onClick={() => selectValue(number)}
              >
                {number}
              </div>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}