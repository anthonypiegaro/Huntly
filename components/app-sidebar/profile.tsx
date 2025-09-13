"use client"

import Link from "next/link"
import { CircleUserRound, EllipsisVertical } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { LogoutButton } from "./logout-button"


export function Profile() {
  const { state, isMobile, openMobile } = useSidebar()
  const { data } = useSession()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className={cn("w-calc[100%+(--spacing(2))] flex flex-nowrap gap-x-1 items-center rounded-md hover:bg-sidebar-accent px-1 py-2", (state === "expanded" || openMobile) && "w-full max-w-full")}>
            <Avatar className="shrink-0">
              <AvatarImage src={data?.user?.image ?? ""} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className={cn("flex-1 flex flex-col justify-between min-w-0", state === "collapsed" && !openMobile && "hidden")}>
              <span className="text-start text-sm truncate">{data?.user?.name}</span>
              <span className="text-start text-xs text-muted-foreground truncate">{data?.user?.email}</span>
            </div>
            <EllipsisVertical className={cn("h-5 w-5 shrink-0 ml-auto text-muted-foreground", state === "collapsed" && !openMobile && "hidden")}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={isMobile ? "top" : "right"} className={cn(!isMobile && "-translate-y-8")}>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/account">
                <CircleUserRound />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}