import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section id="cta" className="w-full max-w-4xl mx-auto flex flex-col items-center px-2 md:px-8 lg:px-12 xl:px-18 2xl:px-24 pb-18 lg:pb-24">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 p-4 rounded-md ring-2 ring-[oklch(0.750_0_0)]/40 dark:ring-white/40 bg-[oklch(.750_0_0)]/30 dark:bg-white/30 backdrop-blur-lg">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Ready to simplify your job search?
          </h2>
          <p className="text-muted-foreground text-lg">
            Get organized, stay focused, and land more interviews with Huntly. 100% free.
          </p>
        </div>
        <div className="flex sm:justify-center sm:items-center">
          <Button>Try Huntly Now</Button>
        </div>
      </div>
    </section>
  )
}