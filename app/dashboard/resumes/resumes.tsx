"use client"

import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [resumeFilter, setResumeFilter] = useState("")

  useEffect(() => {
    setResumes(initResumes)
  }, [initResumes])

  const filteredResumes = useMemo(() => {
    return resumes.filter(resume => resume.name.toLocaleLowerCase().includes(resumeFilter.toLocaleLowerCase()))
  }, [resumes])

  const handleCreateResumeDialogOpenChange = (open: boolean) => {
    setCreateResumeDialogOpen(open)
  }

  const handleResumeCreationSuccess = (resume: Resume) => {
    setResumes(prev => [resume, ...prev])
  }

  const handleOpenDetails = () => {

  }

  return (
    <>
      <CreateResumeDialog 
        open={createResumeDialogOpen}
        onOpenChange={handleCreateResumeDialogOpenChange}
        onResumeCreationSuccess={handleResumeCreationSuccess}
      />
      <div className="container mx-auto my-10">
        <div className="mb-8 flex items-end gap-x-4">
          <div>
            <Label className="mb-1">Resume</Label>
            <Input 
              value={resumeFilter}
              onChange={e => setResumeFilter(e.target.value)}
              className="w-75 max-w-75"
            />
          </div>
          <div className="w-full">
            <Button variant="outline" className="cursor-pointer" onClick={() => setCreateResumeDialogOpen(true)}>Add Resume</Button>
          </div>
        </div>
        <div className="w-full">
          {filteredResumes.map(resume => (
            <Resume
              key={resume.id}
              id={resume.id}
              name={resume.name}
              description={resume.description}
              url={resume.url}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>
      </div>
    </>
  )
}