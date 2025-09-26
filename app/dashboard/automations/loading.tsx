import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto">
      <div className="w-full h-full my-10">
        <div className="mb-4 flex items-end gap-4 flex-wrap">
          <Skeleton className="w-sm h-9 rounded-md"/>
          <Skeleton className="w-30 h-9 rounded-md" />
          <Skeleton className="w-30 h-9 rounded-md" />
          <Skeleton className="w-30 h-9 rounded-md" />
        </div>
        <Skeleton className="h-50 w-full mb-4 rounded-md" />
        <div className="flex items-center justify-between px-2">
          <div className="text-muted-foreground flex-1 text-sm">
            0 of{" "}
            0 row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <Skeleton className="h-9 w-45"/>
            <Skeleton className="h-9 w-45"/>
            <Skeleton className="h-9 w-45"/>
          </div>
        </div>
      </div>
    </div>
  )
}