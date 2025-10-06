"use client"

import { 
  useCallback, 
  useEffect, 
  useRef, 
  useState 
} from "react"
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
import { DataTableTrackedFilter } from "./data-table-tracked-filter"
import { DeleteSingleRowDialog } from "./delete-single-row-dialog"
import { DataTableScoreFilter } from "./data-table-score-filter"
import { filterFns } from "./custom-filter-fns"
import { BulkDeleteDialog } from "./bulk-delete-dialog"

export type ScoreDetails = { 
  score: number 
  goodPoints: string[]
  poorPoints: string[]
}

export type SingleFitDeleteDetails = {
  id: string
  name: string
}

export type NumericComparator = ">" | "<" | "=" | "none"

export type NumberFilter = {
  comparator: NumericComparator
  value: number
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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "tracked",
      value: [true, false],
    },
    {
      id: "score",
      value: { comparator: 'none', value: 1 }
    }
  ])

  const [JobDescriptionDialogJobDescription, setJobDescriptionDialogJobDescription] = useState<string | null>(null)
  const [scoreDetailsDialogDetails, setScoreDetailsDialogDetails] = useState<ScoreDetails | null>(null)
  const [deleteSingleRowDialogDetails, setDeleteSingleRowDialogDetails] = useState<SingleFitDeleteDetails | null>(null)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable<Fit>({
    columns,
    data,
    getRowId: row => row.id, 
    autoResetPageIndex,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
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
      },
      openDeleteSingleFitDialog: (details: SingleFitDeleteDetails) => {
        setDeleteSingleRowDialogDetails(details)
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

  const handleBulkTrackSuccess = (ids: string[]) => {
    setData(prev => prev.map(fit => ({
      ...fit,
      tracked: ids.includes(fit.id) ? true : fit.tracked
    })))
  }

  const handleDeleteSingleRowDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDeleteSingleRowDialogDetails(null)
    }
  }

  const handleDeleteSingleRow = (id: string) => {
    setData(prev => prev.filter(fit => fit.id !== id))
  }

  const handleBulkDelete = (ids: string[]) => {
    setData(prev => prev.filter(fit => !ids.includes(fit.id)))
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
      <DeleteSingleRowDialog
        open={deleteSingleRowDialogDetails !== null}
        onOpenChange={handleDeleteSingleRowDialogOpenChange}
        deleteId={deleteSingleRowDialogDetails?.id ?? ""}
        deleteName={deleteSingleRowDialogDetails?.name ?? ""}
        onDelete={handleDeleteSingleRow}
      />
      <BulkDeleteDialog 
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        ids={table.getSelectedRowModel().rows.map(row => row.id)}
        onSuccess={handleBulkDelete}
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
          <DataTableTrackedFilter table={table} />
          <DataTableScoreFilter table={table} />
          <CreateFitDialog resumes={resumes} onSuccess={handleFitCreationSuccess} />
          <BulkActionsDropdown
            table={table}
            onBulkTrackSuccess={handleBulkTrackSuccess}
            buttonClassName={cn(
              "transition-all duration-300 opacity-100",
              table.getSelectedRowModel().rows.length === 0 && "!opacity-0 !pointer-events-none"
            )} 
            disabled={table.getSelectedRowModel().rows.length === 0}
            onOpenBulkDeleteDialog={() => setBulkDeleteDialogOpen(true)}
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