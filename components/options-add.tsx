"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Option, optionResolver } from "@/lib/validations/options"
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
import { Switch } from "./ui/switch"

const AddOptions = ({ fields }) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const form = useForm<Option>({
    resolver: optionResolver,
    defaultValues: {
      field_id: "",
      option_label: "",
      isAnswer: false,
    },
  })

  const onSubmit = async (values: Option) => {
    const { data, error } = await supabase.from("options").insert([
      {
        field_id: values.field_id,
        option_label: values.option_label,
        isAnswer: values.isAnswer,
      },
    ])

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
          name="option_label"
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
          name="field_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Field</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fields</SelectLabel>
                      {fields.map((field) => {
                        return (
                          <SelectItem value={field.field_id}>
                            {field.field_label}
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
          name="isAnswer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Answer</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => field.onChange(e)}
                />
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

export default AddOptions
