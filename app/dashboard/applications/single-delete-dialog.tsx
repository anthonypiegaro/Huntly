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

import { deleteSingleApplication } from "./delete-single-application.action"

export function SingleDeleteDialog({
  id,
  name,
  open,
  onOpenChange,
  onSuccess
}: {
  id: string
  name: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (id: string) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteApplication = async () => {
    setIsDeleting(true)

    await deleteSingleApplication(id)
      .then(() => {
        toast.success("Success", {
          description: `Application for "${name}" has been deleted successfully.`
        })
        onSuccess(id)
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
          <DialogTitle>
            Delete Application
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete your application with <span className="text-destructive">{name}</span>?{" "}
            This action cannot be undone.
          </p>
          <div className="flex justify-end items-center gap-x-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={deleteApplication}
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