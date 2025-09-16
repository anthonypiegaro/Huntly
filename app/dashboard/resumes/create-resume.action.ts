"use server"

import pdf from "pdf-parse"

import { ResumeSchema } from "./create-resume-dialog"

export const createResume = async ({ name, file }: ResumeSchema) => {
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed")
  }

  if (file.size > 1024*1024) {
    throw new Error("File size too large (max 1MB)")
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const parsed = await pdf(buffer)
  
  const text = parsed.text.trim()

  console.log(text)

  return { text: text }
}
