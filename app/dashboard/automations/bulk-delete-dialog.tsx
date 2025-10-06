"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { bulkDeleteFitScores } from "./bulk-delete.action"

export function BulkDeleteDialog({
  ids,
  open,
  onOpenChange,
  onSuccess
}: {
  ids: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (ids: string[]) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteIds = async () => {
    setIsDeleting(true)

    await bulkDeleteFitScores(ids)
      .then(() => {
        toast.success("Success", {
          description: `${ids.length} fit score${ids.length > 1 ? "s": ""} ${ids.length > 1 ? "have" : "has"} been deleted successfully.`
        })
        onSuccess(ids)
        onOpenChange(false)
      })
      .catch(e => {
        toast.error("Error", {
          description: e.message
        })
      })

    setIsDeleting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Fit Scores</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete the {ids.length} selected fit score{ids.length > 1 && "s"}.{" "}
            This action cannot be undone.
          </p>
          <div className="flex justify-end items-center gap-x-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={deleteIds}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}