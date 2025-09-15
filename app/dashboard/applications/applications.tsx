"use client"

import { useState } from "react"

import { StageFilter } from "./stage-filter"

export type Stage = "all" | "bookmarked" | "applied" | "interviewing" | "accepted" | "closed"

export default function Applications() {
  const [stageFilter, setStageFilter] = useState<Stage>("all")

  function handleStageFilterChange(stage: Stage) {
    setStageFilter(stage)
  }

  return (
    <div className="container mx-auto">
      <StageFilter 
        selectedStage={stageFilter}
        onChangeStageFilter={handleStageFilterChange}
      />
    </div>
  )
}