"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { and, eq, inArray } from "drizzle-orm"

import { db } from "@/db/db"
import { application, fit } from "@/db/schema"
import { auth } from "@/lib/auth"

export type FitToAppSchema = {
  id: string
  role: string
  company: string
  resumeId: string
  location: string
  applicationUrl: string | null
  jobDescription: string
}

export const createBulkApps = async (values: FitToAppSchema[]) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const fits = values.map(fit => ({
    userId,
    role: fit.role,
    company: fit.company,
    location: fit.location,
    applicationUrl: fit.applicationUrl,
    resumeId: fit.resumeId,
    jobDescription: fit.jobDescription
  }))

  const fitIds = values.map(fit => fit.id)

  await db.transaction(async tx => {
    const createApps = tx
      .insert(application)
      .values(fits)
    
    const updateFitTrackedValues = tx.update(fit).set({ tracked: true }).where(and(inArray(fit.id, fitIds), eq(fit.userId, userId)))

    await Promise.all([createApps, updateFitTrackedValues])
  })
}

