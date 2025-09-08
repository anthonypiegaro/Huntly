"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"

export function SignInButton() {
  const session = useSession()

  if (session.data?.user) {
    return (
      <Button className="max-sm:text-base" asChild>
        <Link href="/dashboard">
          Dashboard
        </Link>
      </Button>
    )
  }

  return (
    <Button className="max-sm:text-base" asChild>
      <Link href="/auth">Sign In</Link>
    </Button>
  )
}