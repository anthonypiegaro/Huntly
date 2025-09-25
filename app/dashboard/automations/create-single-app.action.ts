"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { and, eq } from "drizzle-orm"

import { db } from "@/db/db"
import { application, fit } from "@/db/schema"
import { auth } from "@/lib/auth"

import { Fit } from "./columns"

export const createSingleApp = async (values: Fit) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  await db.transaction(async tx => {
    const createApp = tx
      .insert(application)
      .values({
        userId,
        role: values.role,
        company: values.company,
        location: values.location,
        applicationUrl: values.applicationUrl,
        resumeId: values.resume.id,
        jobDescription: values.jobDescription
      })
    
    const updateFitTrackedValue = tx.update(fit).set({ tracked: true }).where(and(eq(fit.id, values.id), eq(fit.userId, userId)))

    await Promise.all([createApp, updateFitTrackedValue])
  })
}

