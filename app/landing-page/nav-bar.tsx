import { Origami } from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function NavBar({
  className
}: {
  className?: string
}) {
  return (
    <nav className={cn("fixed top-4 left-1/2 -translate-x-1/2 z-100 flex justify-between items-center w-[calc(100dvw-(--spacing(8)))] max-w-6xl p-2 rounded-md ring-2 ring-[oklch(0.750_0_0)]/40 dark:ring-white/40 bg-[oklch(.750_0_0)]/30 dark:bg-white/30 backdrop-blur-lg text-[oklch(0.400_0_0)] dark:text-[oklch(0.850_0_0)]", className)}>
      <a href="#hero">
        <Origami size={32} className="shrink-0" />
      </a>
      <ul className="flex gap-x-5 text-lg font-medium">
        <li className="hover:text-[oklch(0.200_0_0)] transition-all dark:hover:text-[oklch(0.950_0_0)]">
          <a href="#services">Services</a>
        </li>
        <li className="max-sm:hidden hover:text-[oklch(0.200_0_0)] transition-all dark:hover:text-[oklch(0.950_0_0)]">
          <a href="#how-it-works">How it works</a>
        </li>
        <li className="max-sm:hidden hover:text-[oklch(0.200_0_0)] transition-all dark:hover:text-[oklch(0.950_0_0)]">
          <a href="#testimonials">Testimonials</a>
        </li>
        <li className="hover:text-[oklch(0.200_0_0)] transition-all dark:hover:text-[oklch(0.950_0_0)]">
          <a href="#pricing">Pricing</a>
        </li>
        <li className="max-sm:hidden hover:text-[oklch(0.200_0_0)] transition-all dark:hover:text-[oklch(0.950_0_0)]">
          <a href="#faq">FAQ</a>
        </li>
      </ul>
      <Button className="max-sm:text-base ">
        Sign In
      </Button> {/* this will be a sign in or a dashboard button depending on the auth status */}
    </nav>
  )
}