"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Series, SeriesResolver } from "@/lib/validations/series"
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

const AddSeries = () => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const form = useForm<Series>({
    resolver: SeriesResolver,
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (payload: Series) => {
    const { data, error } = await supabase.from("series").insert(payload)
    if (error) {
      return toast.error(error.message)
    }
    toast.success("Series added successfully")
    router.refresh()
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
        <Button type="submit">
          {form.formState.isSubmitting ? "Adding..." : "Add"}
        </Button>
      </form>
    </Form>
  )
}

export default AddSeries
