import { cn } from "@/lib/utils"

import { Stage } from "./applications"

const stages: Stage[] = ["all", "bookmarked", "applied", "interviewing", "accepted", "closed"]

function capitalizeFirst(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function StageFilter({
  selectedStage,
  onChangeStageFilter,
  className
}: {
  selectedStage: Stage
  onChangeStageFilter: (value: Stage) => void
  className?: string
}) {
  return (
    <div 
      className={cn(
        "flex border w-fit p-1 mx-auto rounded-xl bg-[oklch(0.750_0_0)] dark:bg-card cursor-pointer dark:text-primary",
        className
      )}
    >
      {stages.map(stage => (
        <div
          key={stage}
          className={cn(
            "flex justify-center w-23 py-1 font-medium text-sm transition-all rounded-lg hover:bg-[oklch(0.350_0_0)]",
            selectedStage === stage ? "bg-[oklch(0.225_0_0)] text-[oklch(0.900_0_0)] dark:bg-[oklch(0.450_0_0)]" : "hover:text-[oklch(0.900_0_0)] dark:hover:bg-[oklch(0.350_0_0)]"
          )}
          onClick={() => onChangeStageFilter(stage)}
        >
          {capitalizeFirst(stage)}
        </div>
      ))}
    </div>
  )
}