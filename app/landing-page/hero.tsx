import { Bot, EllipsisVertical, File, Layers, Origami, PanelLeftIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { mockData } from "./data"
import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"

export function Hero() {
  return (
    <section id="hero" className="mt-32 py-12 mb-12 lg:mb-18 grid grid-cols-1 md:grid-cols-2 px-2">
      <div className="mx-auto">
        <div className="flex items-center mb-4">
          <Avatar className="ring ring-[oklch(0.400_0_0)] size-7">
            <AvatarImage src="/people/avatar-ap.webp" />
            <AvatarFallback className="text-sm">AP</AvatarFallback>
          </Avatar>
          <Avatar className="-translate-x-1/2 ring ring-[oklch(0.250_0_0)] bg-[oklch(0.450_0_0)] size-7">
            <AvatarImage src="/people/avatar-man.svg" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <Avatar className="-translate-x-1/1 ring ring-[oklch(0.250_0_0)] bg-[oklch(0.450_0_0)] size-7">
            <AvatarImage src="/people/avatar-woman.svg"/>
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <p className="font-medium -translate-x-5 text-muted-foreground">1+ active users</p>
        </div>
        <div className="max-w-sm 2xl:max-w-lg mb-6">
          <h1 className="text-4xl 2xl:text-6xl font-semibold mb-4">Make the Job Hunt Less Painful</h1>
          <p className="2xl:text-lg text-muted-foreground font-medium">Most job trackers are slow, messy, and lack automation. Huntly is fast, organized, and smart. Make the switch.</p>
        </div>
        <div className="flex gap-x-4">
          <Button>Get Started</Button>
          <Button variant="secondary">Watch Demo</Button>
        </div>
      </div>
      <div className="max-md:hidden">
        <div className="relative rounded-l-sm h-100 2xl:h-125 w-[calc(100%+(--spacing(2)))] pl-42 pt-2 ring-2 ring-[oklch(0.750_0_0)] dark:ring-[oklch(0.350_0_0)] bg-[oklch(0.225_0_0)]">
          <div className="absolute top-0 left-0 bottom-0 w-42 flex flex-col px-2 py-3 text-[oklch(0.900_0_0)]">
            <div className="flex items-center gap-x-2 mb-4">
              <Origami className="w-6 h-6" />
              <h2 className="text-xl font-medium">Huntly</h2>
            </div>
            <ul className="text-sm flex flex-col gap-y-1">
              <li className="flex items-center gap-x-1 p-1 rounded-sm bg-[oklch(0.400_0_0)] cursor-pointer">
                <Layers className="w-4 h-4" />
                Applications
              </li>
              <li className="flex items-center gap-x-1 p-1 rounded-sm hover:bg-[oklch(0.400_0_0)] cursor-pointer">
                <Bot className="w-4 h-4" />
                Automations
              </li>
              <li className="flex items-center gap-x-1 p-1 rounded-sm hover:bg-[oklch(0.400_0_0)] cursor-pointer">
                <File className="w-4 h-4" />
                Resumes
              </li>
            </ul>
            <div className="flex justify-between items-center mt-auto rounded-md hover:bg-[oklch(0.400_0_0)] p-1 cursor-pointer">
              <div className="flex items-center gap-x-1">
                <Avatar className="size-7">
                  <AvatarImage src="/people/avatar-ap.webp"/>
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-xs">Anthony</p>
                  <p className="text-xs">ap@gmail.com</p>
                </div>
              </div>
              <EllipsisVertical className="w-4 h-4" />
            </div>
          </div>
          <div className="w-full h-full rounded-tl-md bg-background overflow-hidden">
            <div className="flex items-center gap-x-4 w-full border-b-2 border-[oklch(0.225_0_0)] p-2">
              <div className="text-[oklch(0.225_0_0)] dark:text-[oklch(0.900_0_0)]">
                <PanelLeftIcon className="h-4 w-4" />
              </div>
              <div className="h-4 w-[2px] bg-[oklch(0.225_0_0)] dark:bg-[oklch(0.900_0_0)] rounded-sm" />
              <h2 className="text-[oklch(0.225_0_0)] font-semibold dark:text-[oklch(0.900_0_0)]">Applications</h2>
            </div>
            <div className="w-full py-8 px-2">
              <div className="flex border w-fit p-1 mx-auto rounded-xl bg-[oklch(0.750_0_0)] dark:bg-card cursor-pointer dark:text-primary">
                <div className="flex justify-center w-23 py-1 font-medium text-sm rounded-lg bg-[oklch(0.225_0_0)] text-[oklch(0.900_0_0)] dark:bg-[oklch(0.450_0_0)]">All</div>
                <div className="flex justify-center w-23 py-1 font-medium text-sm transition-all rounded-lg hover:bg-[oklch(0.350_0_0)] hover:text-[oklch(0.900_0_0)] dark:hover:bg-[oklch(0.350_0_0)]">Bookmarked</div>
                <div className="flex justify-center w-23 py-1 font-medium text-sm transition-all rounded-lg hover:bg-[oklch(0.350_0_0)] hover:text-[oklch(0.900_0_0)] dark:hover:bg-[oklch(0.350_0_0)]">Applied</div>
                <div className="flex justify-center w-23 py-1 font-medium text-sm transition-all rounded-lg hover:bg-[oklch(0.350_0_0)] hover:text-[oklch(0.900_0_0)] dark:hover:bg-[oklch(0.350_0_0)]">Interviewing</div>
                <div className="flex justify-center w-23 py-1 font-medium text-sm transition-all rounded-lg hover:bg-[oklch(0.350_0_0)] hover:text-[oklch(0.900_0_0)] dark:hover:bg-[oklch(0.350_0_0)]">Accepted</div>
                <div className="flex justify-center w-23 py-1 font-medium text-sm transition-all rounded-lg hover:bg-[oklch(0.350_0_0)] hover:text-[oklch(0.900_0_0)] dark:hover:bg-[oklch(0.350_0_0)]">Closed</div>
              </div>
            </div>
            <div className="w-full min-w-2xl px-2">
              <DataTable columns={columns} data={mockData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}