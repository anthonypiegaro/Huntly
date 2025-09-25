"use client"

import { 
  useCallback, 
  useEffect, 
  useRef, 
  useState 
} from "react"
import { 
  ColumnDef, 
  flexRender, 
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
import { cn } from "@/lib/utils"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"
import { CreateFitDialog } from "./create-fit-dialog"
import { Resume } from "./page"
import { Fit } from "./columns"
import { JobDescriptionDialog } from "./job-description-dialog"
import { ScoreDetailsDialog } from "./score-details-dialog"
import { BulkActionsDropdown } from "./bulk-actions-dropdown"

export type ScoreDetails = { 
  score: number 
  goodPoints: string[]
  poorPoints: string[]
}

function useSkipper() {
  const shouldSkipRef = useRef(true)
  const shouldSkip = shouldSkipRef.current

  const skip = useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

export function DataTable<TValue>({
  columns,
  initData,
  resumes
}: {
  columns: ColumnDef<Fit, TValue>[]
  initData: Fit[]
  resumes: Resume[]
}) {
  const [data, setData] = useState(initData)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [JobDescriptionDialogJobDescription, setJobDescriptionDialogJobDescription] = useState<string | null>(null)
  const [scoreDetailsDialogDetails, setScoreDetailsDialogDetails] = useState<ScoreDetails | null>(null)

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable({
    columns,
    data,
    getRowId: row => row.id, 
    autoResetPageIndex,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnVisibility,
      rowSelection
    },
    meta: {
      openJobDescription: (jobDescription: string) => {
        setJobDescriptionDialogJobDescription(jobDescription)
      },
      openScoreDetails: (details: ScoreDetails) => {
        setScoreDetailsDialogDetails(details)
      },
      updateSingleTrackedValue: (id: string) => {
        setData(prev => prev.map(fit => ({
          ...fit,
          tracked: id === fit.id ? true : fit.tracked
        })))
      }
    }
  })

  const handleFitCreationSuccess = (fit: Fit) => {
    setData(prev => [fit, ...prev])
  }

  const handleJobDescriptionDialogOpenChange = (open: boolean) => {
    if (!open) {
      setJobDescriptionDialogJobDescription(null)
    }
  }

  const handleScoreDetailsDialogOpenChange = (open: boolean) => {
    if (!open) {
      setScoreDetailsDialogDetails(null)
    }
  }

  return (
    <>
      <ScoreDetailsDialog 
        open={scoreDetailsDialogDetails ? true : false}
        onOpenChange={handleScoreDetailsDialogOpenChange}
        details={scoreDetailsDialogDetails ? scoreDetailsDialogDetails : { score: 0, goodPoints: [], poorPoints: [] }}
      />
      <JobDescriptionDialog 
        open={JobDescriptionDialogJobDescription ? true : false}
        onOpenChange={handleJobDescriptionDialogOpenChange}
        jobDescription={JobDescriptionDialogJobDescription}
      />
      <div className="w-full h-full my-10">
        <div className="mb-4 flex items-end gap-4 flex-wrap">
          <Input
            value={table.getState().globalFilter}
            onChange={e => table.setGlobalFilter(String(e.target.value))}
            placeholder="Search..."
            className="max-w-sm"
          />
          <DataTableViewOptions table={table} />
          <CreateFitDialog resumes={resumes} onSuccess={handleFitCreationSuccess} />
          <BulkActionsDropdown 
            buttonClassName={cn(
              "transition-all duration-300 opacity-100",
              table.getSelectedRowModel().rows.length === 0 && "!opacity-0 !pointer-events-none"
            )} 
            disabled={table.getSelectedRowModel().rows.length === 0}
          />
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
                  <TableCell colSpan={columns.length} className="h-24 text-2xl text-center">
                    No fit scores.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </>
  )
}