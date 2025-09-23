"use client"

import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { ScoreDetails } from "./data-table"

export function ScoreDetailsDialog({
  open,
  onOpenChange,
  details
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  details: ScoreDetails
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="flex flex-col sm:max-w-4xl max-h-[90%]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Score: {details.score} out of 10</DialogTitle>
        </DialogHeader>
        <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 flex flex-col gap-y-4 overflow-y-scroll">
          <div>
            <h2 className="text-xl font-medium">Good</h2>
            <ul className="list-disc ml-8">
              {details.goodPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium">Poor</h2>
            <ul className="list-disc ml-8">
              {details.poorPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}