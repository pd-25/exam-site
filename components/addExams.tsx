"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Exams, ExamsResolver } from "@/lib/validations/exams"
import { Series } from "@/lib/validations/series"
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
import { Textarea } from "./ui/textarea"

const AddExams = ({ classrooms, languages, series }) => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const form = useForm<Exams>({
    resolver: ExamsResolver,
    defaultValues: {
      name: "",
      description: "",
      series_id: "",
      classroom_id: "",
      language_id: "",
      total_time: 0,
      time_per_page: 0,
      percentage: "",
    },
  })

  const onSubmit = async (payload: Series) => {
    const { data, error } = await supabase.from("exams").insert(payload)
    if (error) {
      return toast.error(error.message)
    }
    toast.success("Exam added successfully")
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="series_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Series</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => {
                    field.onChange(e)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Series</SelectLabel>
                      {series?.map((item) => {
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
        <FormField
          control={form.control}
          name="classroom_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e)
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classroom</SelectLabel>
                      {classrooms.map((item) => {
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
        <FormField
          control={form.control}
          name="language_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => {
                    field.onChange(e)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Language</SelectLabel>
                      {languages?.map((item) => {
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

        <FormField
          control={form.control}
          name="total_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Time (Sec)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Total Time"
                  type="number"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value))
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time_per_page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Per Page (Sec)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Time Per Page"
                  type="number"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value))
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage</FormLabel>
              <FormControl>
                <Input placeholder="Enter Percentage" {...field} />
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

export default AddExams
