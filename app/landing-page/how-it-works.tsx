export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-2 md:px-8 lg:px-12 xl:px-18 2xl:px-24 pb-18 lg:pb-24">
      <h2 className="text-center text-4xl 2xl:text-6xl font-semibold mb-12">How it works?</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            Step 1: Upload Your Resumes
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Start by uploading all the resumes you plan to use during your job application batch. Keep them organized in one place so you can quickly match the right resume to the right job.
          </p>
        </div>
        <div className="p-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            Step 2: Apply with Automation
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            When you apply to jobs, let the app handle the repetitive work. Automatically generate tailored cover letters and fill in application questions so you can focus on finding the right opportunities instead of typing the same answers over and over.
          </p>
        </div>
        <div className="p-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            Step 3: Track Every Application
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Stay on top of your job search with built-in tracking. See the status of every application, follow its lifecycle, and never lose track of where you stand.
          </p>
        </div>
      </div>
    </section>
  )
}