"use client"

import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog"

export function CreateFitDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Generate New Fit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Fit Form</DialogTitle>
          <DialogDescription>
            Let Huntly AI job matcher check if this job is a fit.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}