"use client"

import { useState } from "react"
import { 
  ColumnDef, 
  ColumnFiltersState, 
  flexRender, 
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable, 
  VisibilityState
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { CreateFitDialog } from "./create-fit-dialog"

export function DataTable<TData, TValue>({
  columns,
  data
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full h-full my-10">
      <div className="mb-4 flex items-end gap-4 flex-wrap">
        <div>
          <Label className="mb-1">Company</Label>
          <Input
            placeholder="Filter company..."
            value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("company")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <DataTableViewOptions table={table} />
        <CreateFitDialog />
      </div>
      <div className="mb-4 rounded-md border-2 border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="border-b-2 border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)]">
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {
                      header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                      }
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow 
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)] hover:bg-[oklch(0.255_0_0)]/20 dark:hover:bg-[oklch(0.450_0_0)]/30 font-medium dark:font-normal"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="max-w-20 truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ): (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No fit scores.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}