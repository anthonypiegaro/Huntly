"use client"

import { useState } from "react"
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
  FormMessage,
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
import { wait } from "@/lib/utils"
import { Resume } from "./page"
import { Application } from "./columns"
import { createApplication } from "./create-application.action"

const addApplicationSchema = z.object({
  role: z.string().min(1, "Role is required").max(150, "Role can be no longer than 150 characters"),
  company: z.string().min(1, "Company is required").max(150, "Company can be no longer than 150 characters"),
  location: z.string(),
  jobDescription: z.string().max(10000, "Job description can be no longer than 10,000 characters"),
  applicationUrl: z.string().max(10000, "Application url can be no longer than 10,000 characters"),
  resumeId: z.string(),
})

export type AddApplicationSchema = z.infer<typeof addApplicationSchema>

export function AddApplicationDialog({
  resumes,
  onSuccess
}: {
  resumes: Resume[]
  onSuccess: (app: Application) => void
}) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AddApplicationSchema>({
    resolver: zodResolver(addApplicationSchema),
    defaultValues: {
      role: "",
      company: "",
      location: "",
      jobDescription: "",
      applicationUrl: "",
      resumeId: ""
    }
  })

  const onSubmit = async (values: AddApplicationSchema) => {
    setIsSubmitting(true)

    await createApplication(values)
      .then(id => {
        toast.success("Success", {
          description: `Successfully added application to ${values.company}`
        })
        onSuccess({
          id: id,
          resume: { id: values.resumeId, name: resumes.find(resume => resume.id === values.resumeId)?.name ?? "NA" },
          role: values.role,
          company: values.company,
          location: values.location,
          jobDescription: values.jobDescription,
          applicationUrl: values.jobDescription,
          dateAdded: new Date(),
          dateApplied: null,
          dateResponded: null,
          dateInterviewed: null,
          dateAccepted: null,
          dateClosed: null,
        })
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
      location: "",
      jobDescription: "",
      applicationUrl: "",
      resumeId: ""
    })
    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add Application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Application
          </DialogTitle>
          <DialogDescription>
            Provide role, company, and other details to create a new application record.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-1">
                    Role
                    <span className="text-destructive">*</span>
                  </FormLabel>
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
                  <FormLabel className="gap-1">
                    Company
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-x-4">
              <FormField 
                control={form.control}
                name="resumeId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Resume</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                      <FormControl>
                        <SelectTrigger className="w-full">
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
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Application Url</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="self-end" disabled={isSubmitting}>
              {isSubmitting ? "Adding application... " : "Add application"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}