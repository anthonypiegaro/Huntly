"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggleButton({
  variant="outline",
  className
}: {
  variant?: "outline" | "icon"
  className?: string
}) {
  const { setTheme } = useTheme()

  const handleThemeChange = () => setTheme(prev => prev === "light" ? "dark" : "light")

  return (
    <Button variant={variant === "outline" ? "outline" : "ghost"} size="icon" onClick={handleThemeChange} className={className}>
      <Sun className={cn("h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90", variant == "icon" && "size-5")} />
      <Moon className={cn("absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0", variant == "icon" && "size-5")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
