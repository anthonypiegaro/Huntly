"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { createResume } from "./create-resume.action"

const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  file: z.file().min(1).max(1024 * 1024).mime("application/pdf")
})

export type ResumeSchema = z.infer<typeof resumeSchema>

export function CreateResumeDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = async (values: ResumeSchema) => {
    setIsSubmitting(true)

    const resumeText = await createResume(values)

    console.log(resumeText)

    setIsSubmitting(false)
  }

  const handleOpenChange = (open: boolean) => {
    form.reset({
      name: ""
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