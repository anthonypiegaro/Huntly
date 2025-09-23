"use client"

import { useContext, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { Resume } from "./page"
import { Fit } from "./columns"
import { generateFit } from "./generate-fit.action"

const generateFitSchema = z.object({
  role: z.string().min(1, "Role is requried.").max(150, "Role too long. Max 150 characters."),
  company: z.string().min(1, "Company is requried.").max(150, "Company too long. Max 150 characters."),
  jobDescription: z.string().min(1, "Job description required.").max(10000, "Job Description too long. Max 10,000 characters."),
  resumeId: z.string().min(1, "Resume required")
})

export type GenerateFitSchema = z.infer<typeof generateFitSchema>

export function CreateFitDialog({
  resumes,
  onSuccess
}: {
  resumes: Resume[]
  onSuccess: (fit: Fit) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<GenerateFitSchema>({
    resolver: zodResolver(generateFitSchema),
    defaultValues: {
      role: "",
      company: "",
      jobDescription: "",
      resumeId: ""
    }
  })

  const onSubmit = async (values: GenerateFitSchema) => {
    setIsSubmitting(true)

    await generateFit(values)
      .then(data => {
        toast.success("Success", {
          description: "Fit score generated successfully"
        })
        onSuccess(data)
        handleOpenChange(false)
      })
      .catch(e => {
        toast.error("Error", {
          description: e.message
        })
      })
  
    setIsSubmitting(false)
  }

  const handleOpenChange = (open: boolean) => {
    form.reset({
      role: "",
      company: "",
      jobDescription: "",
      resumeId: ""
    })

    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Generate New Fit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Fit Form</DialogTitle>
          <DialogDescription>
            Let Huntly AI job matcher check if this job is a fit.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="resumeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a resume" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resumes.map(resume => (
                        <SelectItem key={resume.id} value={resume.id}>{resume.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      className="w-full max-w-full min-w-0 h-50 resize-none whitespace-pre-wrap break-words"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="self-end" disabled={isSubmitting}>
              {isSubmitting ? "Generating fit..." : "Generate Fit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}