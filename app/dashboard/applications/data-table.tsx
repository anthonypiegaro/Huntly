"use client"

import { 
  useMemo, 
  useState 
} from "react"
import { 
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"

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
import { date } from "zod"

export function DataTable<TValue>({
  columns,
  initData
}: {
  columns: ColumnDef<Application, TValue>[]
  initData: Application[]
}) {
  const [data, setData] = useState(initData)
  const [stageFilter, setStageFilter] = useState<Stage>("all")

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
  }, [date, stageFilter])



  const table = useReactTable({
    columns,
    data: dataCleaned,
    getCoreRowModel: getCoreRowModel()
  })

  const handleChangeStageFilter = (stage: Stage) => {
    setStageFilter(stage)
  }

  return (
    <>
      <StageFilter
        selectedStage={stageFilter}
        onChangeStageFilter={handleChangeStageFilter}
        className="mt-10 mb-8"
      />
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
                <TableCell colSpan={columns.length} className="h-24 text-2xl text-center">
                  No applications.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}