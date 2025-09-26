"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { and, eq } from "drizzle-orm"

import { db } from "@/db/db"
import { fit } from "@/db/schema"
import { auth } from "@/lib/auth"

export const deleteSingleFit = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  await db.delete(fit).where(and(
    eq(fit.id, id),
    eq(fit.userId, userId)
  ))
}