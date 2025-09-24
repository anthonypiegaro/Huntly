"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/db/db"
import { application, resume } from "@/db/schema"
import { auth } from "@/lib/auth"

import { Application } from "./columns"

export const getApplications = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const applications = await db
    .select({
      id: application.id,
      resumeId: application.resumeId,
      resumeName: resume.name,
      role: application.role,
      company: application.company,
      location: application.location,
      jobDescription: application.jobDescription,
      applicationUrl: application.applicationUrl,
      dateAdded: application.dateAdded,
      dateApplied: application.dateApplied,
      dateResponded: application.dateResponded,
      dateInterviewed: application.dateInterviewed,
      dateAccepted: application.dateAccepted,
      dateClosed: application.dateClosed
    })
    .from(application)
    .leftJoin(resume, eq(application.resumeId, resume.id))
    .where(eq(application.userId, userId))

  const applicationsCleaned: Application[] = applications.map(app => {
    let resume = null

    if (app.resumeId !== null && app.resumeName !== null) {
      resume = { id: app.resumeId, name: app.resumeName }
    }

    return {
      id: app.id,
      resume,
      role: app.role,
      company: app.company,
      location: app.location,
      jobDescription: app.jobDescription,
      applicationUrl: app.applicationUrl,
      dateAdded: app.dateAdded,
      dateApplied: app.dateApplied,
      dateResponded: app.dateResponded,
      dateInterviewed: app.dateInterviewed,
      dateAccepted: app.dateAccepted,
      dateClosed: app.dateClosed
    }
  })

  return applicationsCleaned
}