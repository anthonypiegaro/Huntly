"use server"

import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const fitSchema = z.object({
  score: z.int().min(1).max(10),
  goodPoints: z.array(z.string()),
  poorPoints: z.array(z.string())
})

export type FitSchema = z.infer<typeof fitSchema>

const systemPrompt = `
  You are an expert recruiter assessing candidate resumes.
  Compare the candidate’s resume with the provided job description.
  Assign a fit score:
    - 1 = completely unfit
    - 10 = excellent fit, strong hire
  Also include:
    - goodPoints: Array of reasons where the resume is strong for
      this job
      (skills, experience, accomplishments that line up well).
    - poorPoints: Array of reasons where the resume is weak for
      this job
      (missing skills, irrelevant experience, gaps).
  Keep explanations specific and concise.
`

const resume = `Anthony Piegaro 
Portfolio (https://portfolio-minimal-ivory.vercel.app/)                                                    github.com/anthonypiegaro
 
 
Projects 
 
Pocket | React, Next.js, TypeScript, Tailwind, PostgreSQL (Neon), Drizzle ORM, Google OAuth, Better Auth, 
ShadCN, Zod, React Hook Form, Vercel 
GitHub: https://github.com/anthonypiegaro/Pocket | Demo: https://pocket-mauve.vercel.app/ 
● Built a full-stack content-saving and organizational app for articles and videos, with filtering by tags, 
type (article/video), and completion status. 
● Implemented secure authentication with Google OAuth and Better Auth, ensuring user data protection. 
● Designed a PostgreSQL schema with Drizzle ORM to store item details (title, description, URL, tags, 
status). 
● Optimized performance and UX by using Next.js Server Components for fast data delivery, loading 
states to improve perceived performance (FCP), and optimistic updates for a native app feel. 
● Developed a responsive UI with Tailwind and ShadCN, enabling fast filtering and intuitive navigation. 
● Deployed on Vercel for seamless hosting and personal daily use, replacing Google Sheets and legacy 
tools. 
Board | React, Next.js, TypeScript, Tailwind, PostgreSQL (Neon), Drizzle ORM, Google OAuth, Better Auth, 
ShadCN, Zod, React Hook Form, DnD Kit, Vercel, Git 
GitHub: https://github.com/anthonypiegaro/Board | Demo: https://board-dusky-delta.vercel.app/ 
● Built a Trello-inspired project management tool where users can create projects, each containing 
boards, sortable lists, and draggable cards. 
● Implemented drag-and-drop functionality with DnD Kit, persisting list and card order to the database for 
consistent state across sessions. 
● Designed card detail views with editable fields (title, description, checklists) and support for reordering 
checklist items. 
● Optimized performance and UX with Next.js Server Components, loading states for faster perceived 
performance, and optimistic updates for a native app feel. 
● Integrated secure authentication with Google OAuth and Better Auth, ensuring user data protection. 
● Deployed on Vercel with a responsive UI built using Tailwind and ShadCN. 
Lyft Change | React, Next.js, TypeScript, Tailwind, PostgreSQL (Neon), Drizzle ORM, TanStack Query, 
TanStack Virtual, React DnD, React Hook Form, Zod, Better Auth (Google OAuth), Vercel, Git 
GitHub: https://github.com/anthonypiegaro/Lyft-Change | Demo: https://lyft-change.vercel.app/ 
● Built a full-stack training management app for athletes to create, track, and analyze exercises, 
Associate of Science in Mathematics, Yuba College, Marysville, Ca                                                  Jun 2021
`

export type GenerateFitProps = {
  companyName: string
  jobRole: string
  jobDescription: string
}

export const getFit = async ({ companyName, jobRole, jobDescription }: GenerateFitProps) => {
  const { object } = await generateObject({
    model: openai("gpt-5-nano"),
    schema: fitSchema,
    prompt: `
      Company Name:
      ${companyName}

      Job Role:
      ${jobRole}

      Job Description:
      ${jobDescription}

      Candidate Resume:
      ${resume}
    `,
  })

  console.log(JSON.stringify(object))

  return object
}