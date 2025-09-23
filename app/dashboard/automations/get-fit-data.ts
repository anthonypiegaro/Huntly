"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/db/db"
import { fit, resume } from "@/db/schema"
import { auth } from "@/lib/auth"

export const getFitData = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const fits = await db
    .select({
      id: fit.id,
      role: fit.role,
      company: fit.company,
      resumeId: fit.resumeId,
      resumeName: resume.name,
      jobDescription: fit.jobDescription,
      score: fit.fitScore,
      goodPoints: fit.goodPoints,
      poorPoints: fit.poorPoints,
      tracked: fit.tracked,
      createdAt: fit.createdAt
    })
    .from(fit)
    .innerJoin(resume, eq(fit.resumeId, resume.id))
    .where(eq(fit.userId, userId))

  const fitsCleaned = fits.map(f => ({
      id: f.id,
      role: f.role,
      company: f.company,
      resume: {
        id: f.resumeId,
        name: f.resumeName,
      },
      jobDescription: f.jobDescription,
      score: f.score,
      goodPoints: f.goodPoints,
      poorPoints: f.poorPoints,
      tracked: f.tracked,
      createdAt: f.createdAt
  }))

  return fitsCleaned
}