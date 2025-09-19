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
  DialogHeader,
  DialogTitle
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
import { Textarea } from "@/components/ui/textarea"

import { createResume } from "./create-resume.action"
import { Resume } from "./resumes"

const resumeSchema = z.object({
  name: z.string().min(1, "Name is required").max(150, "Name must be under 150 characters"),
  description: z.string().min(0).max(5000, "Descritpion must be less than 5000 characters"),
  file: z.file().min(1).max(1024 * 1024).mime("application/pdf")
})

export type ResumeSchema = z.infer<typeof resumeSchema>

export function CreateResumeDialog({
  open,
  onOpenChange,
  onResumeCreationSuccess
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResumeCreationSuccess: (resume: Resume) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = async (values: ResumeSchema) => {
    setIsSubmitting(true)

    await createResume(values)
      .then(data => {
        toast.success("Resume Added", {
          description: `Resume "${values.name}" has been added`
        })
        onResumeCreationSuccess({
          id: data.id,
          name: values.name,
          description: values.description,
          url: data.url
        })
        handleOpenChange(false)
      })
      .catch(error => {
        toast.error("Error", {
          description: error.message
        })
      })



    setIsSubmitting(false)
  }

  const handleOpenChange = (open: boolean) => {
    form.reset({
      name: "",
      description: ""
    })
    setIsSubmitting(false)
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Resume</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full max-w-full min-w-0 h-50 resize-none whitespace-pre-wrap break-words"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PDF File</FormLabel>
                  <FormControl>
                    <Input 
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        const files = e.target.files
                        field.onChange(files && files.length > 0 ? files[0] : null)
                      }}
                      disabled={isSubmitting} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto" disabled={!form.formState.isDirty || isSubmitting}>{isSubmitting ? "Adding resume..." : "Add resume"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}