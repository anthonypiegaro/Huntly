"use client"

import { usePathname } from "next/navigation"

import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { SidebarTrigger } from "@/components/ui/sidebar"

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function LayoutHeader() {
  const pathname = usePathname()

  const paths = pathname.split("/")

  const page = capitalize(paths.length > 1 ? paths[2] : "")

  return (
    <div className="flex p-2 items-center gap-x-4 border-b-2 border-sidebar dark:text-[oklch(0.900_0_0)]">
      <SidebarTrigger />
      <div className="h-full w-[2px] rounded-md bg-sidebar"/>
      <h2 className="text-lg font-medium">
        {page}
      </h2>
      <ThemeToggleButton className="ml-auto" variant="icon"/>
    </div>
  )
}