"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { db } from "@/db/db"
import { application } from "@/db/schema"
import { auth } from "@/lib/auth"

import { AddApplicationSchema } from "./add-application-dialog"

export const createApplication = async (values: AddApplicationSchema) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const data = await db
    .insert(application)
    .values({
      userId,
      resumeId: values.resumeId,
      role: values.role,
      company: values.company,
      location: values.location,
      jobDescription: values.jobDescription,
    }).returning({ id: application.id })
  
  return data[0].id
}