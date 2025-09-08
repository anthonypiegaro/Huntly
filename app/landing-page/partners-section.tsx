export function PartnersSection() {
  return (
    <div className="flex flex-1 justify-between items-center gap-x-4 px-2">
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} className="h-4 w-4 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:w-9 lg:h-9 2xl:w-10 2xl:h-10 rounded-full bg-[oklch(0.750_0_0)] dark:bg-[oklch(0.900_0_0)]"/>
      ))}
    </div>
  )
}