"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"

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
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className="w-full flex gap-x-4 items-center mb-4">
        <div className="flex flex-col gap-y-1">
          <Label className="text-sm">Title</Label>
          <Input placeholder="Filter by title..." className="border-[oklch(0.850_0_0)] dark:border-input" />
        </div>
        <div className="flex flex-col self-end gap-y-1">
          <Button variant="outline" className="relative border-[oklch(0.850_0_0)] dark:border-input hover:bg-[oklch(0.850_0_0)] dark:hover:bg-[oklch(0.300_0_0)]">
            Columns
            <div className="h-2 w-2 rounded-full ring ring-[oklch(0.850_0.120_240)] bg-[oklch(0.650_0.120_240)] absolute top-0 right-0 -translate-y-1/3 translate-x-1/3"/>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border-2 border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)]">
        <Table className="overflow-hidden" containerClassName="overflow-x-hidden">
          <TableHeader className="overflow-hidden">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="overflow-x-hidden border-b-2 border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)]">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)] hover:bg-[oklch(0.255_0_0)]/20 dark:hover:bg-[oklch(0.450_0_0)]/30 font-medium dark:font-normal"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No applications.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}