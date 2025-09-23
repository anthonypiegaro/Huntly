"use client"

import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

export function JobDescriptionDialog({
  open,
  onOpenChange,
  jobDescription
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobDescription: string | null
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="flex flex-col sm:max-w-4xl max-h-[90%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Job Description</DialogTitle>
        </DialogHeader>
        <p className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 p-2 bg-card rounded-md overflow-y-scroll whitespace-pre-wrap break-words">{jobDescription}</p>
      </DialogContent>
    </Dialog>
  )
}