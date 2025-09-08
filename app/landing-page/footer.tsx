import { Origami } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center border-t bg-secondary px-2 md:px-8 lg:px-12 xl:px-18 2xl:px-24 py-4">
      <Origami className="w-8 h-8 mb-12" />
      <p className="text-sm text-muted-foreground">© 2025 Huntly. All rights reserved.</p>
    </footer>
  )
}