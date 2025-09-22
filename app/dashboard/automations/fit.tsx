"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { FitSchema, GenerateFitProps, getFit } from "./get-fit.action"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { URL } from "node:url"

export function Fit() {
  const [fit, setFit] = useState<FitSchema| null>(null)
  const [jobRole, setJobRole] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [generatingFit, setGeneratingFit] = useState(false)

  const generateFit = async (values: GenerateFitProps) => {
    setGeneratingFit(true)

    await getFit(values)
      .then(data => (
        setFit(data)
      ))
      .catch(e => {
        toast.error("Error", { description: e.message })
      })

    setGeneratingFit(false)
  }

  const onSubmit = async () => {
    if (
      jobRole.length > 0
      && jobRole.length > 0
      && companyName.length > 0
    ) {
      await generateFit({
        jobDescription,
        jobRole,
        companyName
      })
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-4 p-2">
      <div>
        <Label>Company</Label>
        <Input value={companyName} onChange={e => setCompanyName(e.target.value)} />
      </div>
      <div>
        <Label>Job Description</Label>
        <Input value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
      </div>
      <div>
        <Label>Role</Label>
        <Input value={jobRole} onChange={e => setJobRole(e.target.value)} />
      </div>
      <div>
        <Button type="button" disabled={generatingFit} onClick={onSubmit} >
          {generatingFit ? "Generating fit..." : "Generate fit"}
        </Button>
      </div>
      {fit ? <FitScore score={fit.score} goodPoints={fit.goodPoints} poorPoints={fit.poorPoints}/> : "Generate a fit score"}
    </div>
  )
}

function FitScore({
  score,
  goodPoints,
  poorPoints
}: {
  score: number
  goodPoints: string[]
  poorPoints: string[]
}) {
  return (
    <>
      <h2 className="text-xl font-medium">Score: {score} out of 10</h2>
      <div>
        <h3>Good:</h3>
        <ul>
          {goodPoints.map((point, i) => (
            <li key={i}>
              <p>{point}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Poor:</h3>
        <ul>
          {poorPoints.map((point, i) => (
            <li key={i}>
              <p>{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}