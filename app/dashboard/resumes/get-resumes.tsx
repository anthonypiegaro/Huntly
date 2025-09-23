"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/db/db"
import { resume } from "@/db/schema"
import { auth } from "@/lib/auth"

import { type Resume } from "./resumes"

export const getResumes = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const resumes = await db.select({
    id: resume.id,
    name: resume.name,
    url: resume.url,
    description: resume.description,
  })
  .from(resume)
  .where(eq(resume.userId, userId))

  return resumes
}