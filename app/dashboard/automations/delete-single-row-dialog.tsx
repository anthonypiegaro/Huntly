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

import { deleteSingleFit } from "./delete-single-fit.action"

export function DeleteSingleRowDialog({
  open,
  onOpenChange,
  deleteId,
  deleteName,
  onDelete
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  deleteId: string
  deleteName: string
  onDelete: (id: string) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteSingleFit(deleteId)
      .then(() => {
        toast.success("Success", {
          description: "Successfully deleted fit score"
        })
        onDelete(deleteId)
        onOpenChange(false)
      })
      .catch(error => {
        toast.error("Error", {
          description: error.message
        })
      })

    setIsDeleting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Fit
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete your fit score with <span className="text-destructive">{deleteName}</span>?{" "}
            This action cannot be undone.
          </p>
          <div className="flex justify-end items-center gap-x-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
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