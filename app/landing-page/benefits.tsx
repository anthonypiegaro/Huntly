import { Bot, ChartColumnIncreasing, DollarSign, FileStack, Handshake, Zap } from "lucide-react";

export function Benefits() {
  return (
    <section id="services" className="w-full px-2 md:px-8 lg:px-12 xl:px-18 2xl:px-24 py-18 lg:py-24 mx-auto">
      <h2 className="text-center text-4xl 2xl:text-6xl font-semibold mb-12">Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-13 gap-4" >
        <div key={1} className="p-4 col-span-1 md:col-span-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            <Zap className="h-5 w-5" />
            Fast
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Other job trackers slow down or break after just a few dozen applications. Huntly is built to scale to thousands without ever sacrificing performance. Enjoy a smooth, native-like experience instead of struggling with clunky, broken tools.
          </p>
        </div>
        <div key={2} className="p-4 col-span-1 md:col-span-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            <FileStack className="h-5 w-5" />
            Organized
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Never lose track of an application again. Huntly’s powerful filtering and sorting tools keep your job search organized and under control so you always know exactly where you stand.
          </p>
        </div>
        <div key={3} className="p-4 col-span-1 md:col-span-5 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            <Bot className="h-5 w-5" />
            Automated
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Stop wasting hours rewriting the same answers and cover letters. Huntly’s AI takes your resume, job description, and application questions to automate the most painful parts of the process so you can focus on landing interviews.
          </p>
        </div>
        <div key={4} className="p-4 col-span-1 md:col-span-5 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            <ChartColumnIncreasing className="h-5 w-5" />
            Insightful
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Why collect data if you’re not going to use it? Huntly turns your job search history into actionable insights, showing you what’s working, what’s not, and how to improve your chances.
          </p>
        </div>
        <div key={5} className="p-4 col-span-1 md:col-span-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            <Handshake className="h-5 w-5" />
            Authentic
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            Huntly was built by a job seeker, for job seekers. I know the frustration firsthand, and that’s why I created Huntly: to make the process simpler, less stressful, and more effective.
          </p>
        </div>
        <div key={6} className="p-4 col-span-1 md:col-span-4 rounded-md border bg-card">
          <h3 className="text-2xl font-medium flex items-center gap-x-2 mb-2">
            <DollarSign className="h-5 w-5" />
            Free
          </h3>
          <p className="text-[oklch(0.350_0_0)] font-medium dark:text-muted-foreground">
            100% free. No paywalls, no hidden fees, just tools that work.
          </p>
        </div>
      </div>
    </section>
  )
}