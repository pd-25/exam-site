"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Question, questionResolver } from "@/lib/validations/questions"
import { useSupabase } from "@/app/supabase_provider"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const AddQuestion = ({ exams }) => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const form = useForm<Question>({
    resolver: questionResolver,
    defaultValues: {
      title: "",
      exam_id: "",
    },
  })

  const onSubmit = async (payload: Question) => {
    const { data, error } = await supabase.from("questionsteps").insert(payload)
    if (error) {
      return toast.error(error.message)
    }
    toast.success("Question added successfully")
    form.reset()
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exam_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => {
                    field.onChange(e)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Exams</SelectLabel>
                      {exams?.map((item) => {
                        return (
                          <SelectItem value={item.value}>
                            {item.label}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {form.formState.isSubmitting ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  )
}

export default AddQuestion
