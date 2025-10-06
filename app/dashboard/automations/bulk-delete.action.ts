"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { and, eq, inArray } from "drizzle-orm"

import { db } from "@/db/db"
import { fit } from "@/db/schema"
import { auth } from "@/lib/auth"

export const bulkDeleteFitScores = async (ids: string[]) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  await db.delete(fit).where(and(
    inArray(fit.id, ids),
    eq(fit.userId, userId)
  ))
}