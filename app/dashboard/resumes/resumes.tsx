"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { CreateResumeDialog } from "./create-resume-dialog"

export function Resumes() {
  const [createResumeDialogOpen, setCreateResumeDialogOpen] = useState(false)

  const handleCreateResumeDialogOpenChange = (open: boolean) => {
    setCreateResumeDialogOpen(open)
  }

  return (
    <>
      <CreateResumeDialog 
        open={createResumeDialogOpen}
        onOpenChange={handleCreateResumeDialogOpenChange} 
      />
      <div className="w-full">
        <Button variant="outline" className="cursor-pointer" onClick={() => setCreateResumeDialogOpen(true)}>Add Resume</Button>
      </div>
    </>
  )
}