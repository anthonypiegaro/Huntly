import { Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Anthony",
    photo: "/people/avatar-ap.webp",
    review: "I built Huntly because I was tired of job trackers that slowed down after a few dozen applications. Huntly stays fast and smooth, even when you’re managing hundreds. It feels like a native app, not a clunky spreadsheet."
  },
  {
    name: "Anthony",
    photo: "/people/avatar-ap.webp",
    review: "Before Huntly, I was constantly losing track of where I applied. Now, everything is organized in one place. I can filter, sort, and instantly see the status of every application. It’s like having a personal assistant for my job search."
  },
  {
    name: "Anthony",
    photo: "/people/avatar-ap.webp",
    review: "The automation is a game-changer. Huntly takes my resume and job descriptions and helps me generate cover letters and answers to repetitive questions. It saves me hours every week and keeps me focused on landing interviews."
  },
  {
    name: "Anthony",
    photo: "/people/avatar-ap.webp",
    review: "I wanted more than just a tracker — I wanted insights. Huntly shows me what’s working and what’s not in my job search. The analytics help me adjust my strategy and improve my chances of getting interviews."
  },
  {
    name: "Anthony",
    photo: "/people/avatar-ap.webp",
    review: "Huntly is authentic because it was built from my own frustration as a job seeker. I know how stressful the process can be, and I designed Huntly to make it simpler, less overwhelming, and more effective."
  },
  {
    name: "Anthony",
    photo: "/people/avatar-ap.webp",
    review: "The best part? Huntly is completely free. No paywalls, no hidden fees — just tools that actually work. I believe job seekers shouldn’t have to pay just to apply for jobs."
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full pb-18 lg:pb-24">
      <h2 className="text-center text-4xl 2xl:text-6xl font-semibold mb-12">Loved by job seekers</h2>
      <div className="w-fit flex flex-nowrap gap-x-4 animate-[carousel_60s_linear_infinite] md:animate-[carousel_40s_linear_infinite] hover:[animation-play-state:paused] active:[animation-play-state:paused] max-sm:select-none">
        {testimonials.map((testimonial, i) => (
          <Testimonial 
            key={i + 100}
            name={testimonial.name}
            photo={testimonial.photo}
            review={testimonial.review}
            className={cn(i === 0 && "ml-4")}
          />
        ))}
        {testimonials.map((testimonial, i) => (
          <Testimonial 
            key={i}
            name={testimonial.name}
            photo={testimonial.photo}
            review={testimonial.review}
          />
        ))}
        {testimonials.map((testimonial, i) => (
          <Testimonial 
            key={i}
            name={testimonial.name}
            photo={testimonial.photo}
            review={testimonial.review}
          />
        ))}
      </div>
    </section>    
  )
}

function Testimonial({
  name,
  photo,
  review,
  className
}: {
  name: string
  photo: string
  review: string
  className?: string
}) {
  return (
    <div className={cn("p-4 rounded-md border bg-card flex flex-col shrink-0 w-75 sm:w-100", className)}>
      <div className="flex items-center gap-x-4 mb-2">
        <Avatar>
          <AvatarImage src={photo} />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <h3 className="font-medium">{name}</h3>
      </div>
      <div className="flex mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
        ))}
      </div>
      <p className="text-muted-foreground font-medium dark:font-normal">
        {review}
      </p>
    </div>
  )
}