"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

export function AddApplicationDialog() {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add Application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Application
          </DialogTitle>
          <DialogDescription>
            Provide role, company, and other details to create a new application record.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}