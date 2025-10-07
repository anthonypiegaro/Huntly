"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { and, eq } from "drizzle-orm"

import { db } from "@/db/db"
import { application } from "@/db/schema"
import { auth } from "@/lib/auth"

export const deleteSingleApplication = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  await db.delete(application).where(and(
    eq(application.id, id),
    eq(application.userId, userId)
  ))
}