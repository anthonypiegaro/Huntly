"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import { CreateResumeDialog } from "./create-resume-dialog"
import { Resume } from "./resume"

export type Resume = {
  id: string
  name: string
  url: string
  description: string
}

export function Resumes({
  initResumes
}: {
  initResumes: Resume[]
}) {
  const [resumes, setResumes] = useState<Resume[]>(initResumes)
  const [createResumeDialogOpen, setCreateResumeDialogOpen] = useState(false)

  useEffect(() => {
    setResumes(initResumes)
  }, [initResumes])

  const handleCreateResumeDialogOpenChange = (open: boolean) => {
    setCreateResumeDialogOpen(open)
  }

  const handleResumeCreationSuccess = (resume: Resume) => {
    setResumes(prev => [resume, ...prev])
  }

  return (
    <>
      <CreateResumeDialog 
        open={createResumeDialogOpen}
        onOpenChange={handleCreateResumeDialogOpenChange}
        onResumeCreationSuccess={handleResumeCreationSuccess}
      />
      <div className="w-full">
        <Button variant="outline" className="cursor-pointer" onClick={() => setCreateResumeDialogOpen(true)}>Add Resume</Button>
      </div>
      <div className="w-full">
        {resumes.map(resume => (
          <Resume
            key={resume.id}
            id={resume.id}
            name={resume.name}
            description={resume.description}
            url={resume.url}
          />
        ))}
      </div>
    </>
  )
}