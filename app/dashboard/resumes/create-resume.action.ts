"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { put } from "@vercel/blob"
import pdf from "pdf-parse"

import { db } from "@/db/db"
import { resume } from "@/db/schema"
import { auth } from "@/lib/auth"

import { ResumeSchema } from "./create-resume-dialog"

const getResumeContent = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer())

  const parsed = await pdf(buffer)
  
  const text = parsed.text.trim()

  return text
}

const savePdf = async (userId: string, fileName: string, file: File) => {
  const blob = await put(
    userId + "-" + "fileName", 
    file, 
    { 
      access: "public",
      addRandomSuffix: true,
      contentType: "application/pdf"
    }
  )

  return blob.url
}

export const createResume = async ({ name, description, file }: ResumeSchema) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are allowed")
  }

  if (file.size > 1024*1024) {
    throw new Error("File size too large (max 1MB)")
  }

  const [resumeContent, url] = await Promise.all([
    getResumeContent(file),
    savePdf(userId, name, file)
  ])

  const data = await db.insert(resume).values({
    userId: userId,
    name: name,
    url: url,
    description: description,
    resumeContent: resumeContent
  }).returning({
    id: resume.id
  })

  return {
    id: data[0].id,
    url
  }
}
