"use client"

import { 
  useMemo, 
  useState 
} from "react"
import { 
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"


import { Application } from "./columns"
import { StageFilter } from "./stage-filter"
import { Stage } from "./applications"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { AddApplicationDialog } from "./add-application-dialog"
import { Resume } from "./page"

export function DataTable<TValue>({
  columns,
  initData,
  resumes
}: {
  columns: ColumnDef<Application, TValue>[]
  initData: Application[],
  resumes: Resume[]
}) {
  const [data, setData] = useState(initData)
  const [stageFilter, setStageFilter] = useState<Stage>("all")
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const dataCleaned = useMemo(() => {
    return data.filter(row => {
      switch (stageFilter) {
        case "all":
          return true
        case "bookmarked":
          return (
            row.dateClosed === null
            && row.dateAccepted === null
            && row.dateInterviewed === null
            && row.dateApplied === null
          )
        case "applied":
          return (
            row.dateClosed === null
            && row.dateAccepted === null
            && row.dateInterviewed === null
            && row.dateApplied !== null
          )
        case "interviewing":
          return (
            row.dateClosed === null
            && row.dateAccepted === null
            && row.dateInterviewed !== null
          )
        case "accepted":
          return (
            row.dateClosed === null 
            && row.dateAccepted !== null
          )
        case "closed":
          return row.dateClosed !== null
        default:
          return true
      }
    })
  }, [data, stageFilter])



  const table = useReactTable({
    columns,
    data: dataCleaned,
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: "includesString",
    state: {
      columnVisibility
    }
  })

  const handleChangeStageFilter = (stage: Stage) => {
    setStageFilter(stage)
  }

  const handleAddApplicationSuccess = (app: Application) => {
    setData(prev => [app, ...prev])
  }

  return (
    <>
      <StageFilter
        selectedStage={stageFilter}
        onChangeStageFilter={handleChangeStageFilter}
        className="mt-10 mb-8"
      />
      <div className="mb-4 flex items-end gap-4 flex-wrap">
        <Input
          value={table.getState().globalFilter}
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          placeholder="Search..."
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
        <AddApplicationDialog resumes={resumes} onSuccess={handleAddApplicationSuccess}/>
      </div>
      <div className="mb-4 rounded-md border-2 border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="border-b-2 border-[oklch(0.225_0_0)] dark:border-[oklch(0.350_0_0)]">
                {headerGroup.headers.map(header => (
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
                ))}
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
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-2xl text-center font-medium dark:font-normal">
                  No applications.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  )
}