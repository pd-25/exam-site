"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Field, fieldResolver } from "@/lib/validations/field"
import { Option, optionResolver } from "@/lib/validations/options"
import { useSupabase } from "@/app/supabase_provider"

import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
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

const AddField = ({ steps }) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const form = useForm<Field>({
    resolver: fieldResolver,
    defaultValues: {
      step_id: "",
      field_type: "",
      field_label: "",
      select_multiple: false,
    },
  })

  const onSubmit = async (values: Field) => {
    const { data, error } = await supabase.from("fields").insert(values)
    if (error) {
      return toast.error(error.message)
    }
    toast.success("Option added successfully")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="field_label"
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
          name="step_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Question</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Question</SelectLabel>
                      {steps.map((field) => {
                        return (
                          <SelectItem value={field.step_id}>
                            {field.title}
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
          name="field_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Option Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Option Type</SelectLabel>
                      <SelectItem value={"select"}>Select</SelectItem>
                      <SelectItem value={"text"}>Text</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="select_multiple"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Multiple Option</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e)
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow Multiple Selection
                  </label>
                </div>
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

export default AddField
