import { cookies } from "next/headers"

import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import { LayoutHeader } from "./layout-header"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <LayoutHeader />
        {children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}