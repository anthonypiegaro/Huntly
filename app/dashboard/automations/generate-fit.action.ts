"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/db/db"
import { fit, resume } from "@/db/schema"
import { auth } from "@/lib/auth"

import { GenerateFitSchema } from "./create-fit-dialog"

const fitSchema = z.object({
  score: z.number()
    .int()
    .min(1)
    .max(10)
    .describe("Fit score from 1 (completely unfit) to 10 (excellent fit). Must be a whole number."),
  goodPoints: z.array(
    z.string()
      .min(5)
      .max(500)
      .describe("Specific reasons why the resume is a strong fit. Each point should be concise but informative.")
  )
    .min(1)
    .max(5)
    .describe("Array of 1-5 specific strengths matching the job requirements"),
  poorPoints: z.array(
    z.string()
      .min(5)
      .max(500)
      .describe("Specific reasons why the resume is a weak fit. Focus on gaps and mismatches.")
  )
    .min(0)
    .max(5)
    .describe("Array of 0-5 specific weaknesses or gaps relative to job requirements")
})

export type FitSchema = z.infer<typeof fitSchema>

const systemPrompt = `
You are an expert recruiter with 10+ years of experience assessing candidate resumes against job requirements.

Your task is to analyze how well the provided resume matches the specific job description. Be objective, specific, and thorough in your assessment.

RULES:
1. Score MUST be an integer between 1-10 only. No decimals, no ranges.
2. Base your assessment on actual evidence from the resume vs job description
3. goodPoints should highlight SPECIFIC skills, experiences, or accomplishments that directly match job requirements
4. poorPoints should identify SPECIFIC gaps, missing qualifications, or irrelevant experience
5. Keep each point concise (under 100 words) but specific
6. If there are no poor points, provide an empty array []

CRITICAL: Always respond with a valid JSON object matching the exact schema. Do not include any additional text outside the JSON structure.`

export const generateFit = async (values: GenerateFitSchema) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  const userId = session.user.id

  const resumeRes = await db
    .select({ content: resume.resumeContent, name: resume.name })
    .from(resume)
    .where(and(
      eq(resume.id, values.resumeId),
      eq(resume.userId, userId)
    ))
  
  if (resumeRes.length === 0) {
    throw new Error("Resume ID not valid")
  }

  const resumeContent = resumeRes[0].content
  const resumeName = resumeRes[0].name

  const { object } = await generateObject({
    model: openai("gpt-5-nano"),
    schema: fitSchema,
    mode: "json",
    system: systemPrompt,
    prompt: `Analyze the following resume for the specified position:

      COMPANY: ${values.company}
      ROLE: ${values.role}
      JOB DESCRIPTION:
      ${values.jobDescription}

      CANDIDATE RESUME - ${resumeName}:
      ${resumeContent}

      Provide a detailed fit assessment following the exact schema requirements. Focus on:
      - Direct skill matches and mismatches
      - Relevant experience alignment
      - Educational and certification gaps
      - Cultural/competency fit indicators

      Output ONLY the JSON object with score, goodPoints, and poorPoints.
    `
  })

  const data = await db
    .insert(fit)
    .values({
      userId,
      resumeId: values.resumeId,
      role: values.role,
      company: values.company,
      jobDescription: values.jobDescription,
      fitScore: object.score,
      goodPoints: object.goodPoints,
      poorPoints: object.poorPoints
    }).returning({
      id: fit.id,
      createdAt: fit.createdAt
    })
  
  return {
    id: data[0].id,
    role: values.role,
    company: values.company,
    resume: {
      id: values.resumeId,
      name: resumeName
    },
    jobDescription: values.jobDescription,
    score: object.score,
    goodPoints: object.goodPoints,
    poorPoints: object.poorPoints,
    tracked: false,
    createdAt: data[0].createdAt
  }
}