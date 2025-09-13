"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"

export function LogoutButton() {
  const router = useRouter()

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        }
      }
    })
  }

  return (
    <DropdownMenuItem 
      variant="destructive" 
      className="text-muted-foreground"
      onClick={handleSignout}
    >
      <LogOut />
      Logout
    </DropdownMenuItem>
  )
}