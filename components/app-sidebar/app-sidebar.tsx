"use client"

import { usePathname } from "next/navigation"
import { Bot, File, Layers, Origami } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Profile } from "./profile"


const items = [
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Layers,
  },
  {
    title: "Automations",
    url: "/dashboard/automations",
    icon: Bot,
  },
  {
    title: "Resumes",
    url: "/dashboard/resumes",
    icon: File,
  }
]

export function AppSidebar() {
  const pathName = usePathname()
  const { open } = useSidebar()

  return (
    <Sidebar variant="inset" collapsible="icon" className="text-[oklch(0.900_0_0)]">
      <SidebarHeader>
        <div className="flex items-center gap-x-2">
          <Origami className="h-7 w-7 shrink-0" />
          <h2 className={cn("text-2xl font-semibold", !open && "hidden")}>Huntly</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton isActive={pathName === item.url} asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={cn(open && "hidden")}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Profile />
      </SidebarFooter>
    </Sidebar>
  )
}