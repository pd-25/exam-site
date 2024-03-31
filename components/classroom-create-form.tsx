"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Classroom, language } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { classroomSchema } from "@/lib/validations/classroom"
import { useSupabase } from "@/app/supabase_provider"

import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import MultipleSelector from "./ui/multiselector"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

type FormData = z.infer<typeof classroomSchema>

const ClassRoomForm: React.FC<{
  languages: { label: string; value: number }[]
  classroom?: Classroom
}> = ({ languages, classroom }) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(classroomSchema),
    defaultValues: {
      name: classroom?.name || "",
      languages: languages,
      classroomCategory: classroom?.category || "",
      offline_fee: classroom?.offline_fee || 0,
      online_fee: classroom?.online_fee || 0,
      batch_dates: classroom?.batch_dates.map((item) => new Date(item)) || [
        new Date(),
      ],
    },
  })

  const handleCreate = async (values: FormData) => {
    const { data, error } = await supabase.from("classrooms").insert([
      {
        name: values.name,
        languages: values.languages.map((item) => item.value),
        offline_fee: values.offline_fee,
        online_fee: values.online_fee,
        batch_dates: values.batch_dates,
        category: values.classroomCategory,
      },
    ])
    if (error) {
      return toast.error(error.message)
    }
    form.reset()
    router.refresh()
    return toast.success("Classroom added successfully")
  }

  const handleUpdate = async (values: FormData) => {
    const { data, error } = await supabase
      .from("classrooms")
      .update({
        name: values.name,
        languages: values.languages.map((item) => item.value),
        offline_fee: values.offline_fee,
        online_fee: values.online_fee,
        batch_dates: values.batch_dates,
        classroomSchema: values.classroomCategory,
      })
      .eq("id", classroom?.id)
    if (error) {
      return toast.error(error.message)
    }
    form.reset()
    router.back()
    return toast.success("Classroom updated successfully")
  }

  async function onSubmit(values: FormData) {
    if (classroom) {
      return handleUpdate(values)
    } else {
      return handleCreate(values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classroomCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter Classroom Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <MultipleSelector
                  options={languages.map((item) => {
                    return { label: item.label, value: item.value.toString() }
                  })}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Select Languages"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offline_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offline Fee</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Offline Fee"
                  type="number"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value))
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="online_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Online Fee</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Online Fee"
                  type="number"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value))
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batch_dates"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Batch Dates</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value[0], "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="multiple"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ClassRoomForm
