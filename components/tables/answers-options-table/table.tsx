"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSupabase } from "@/app/supabase_provider"

const AnswersOptions = ({ options }) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const handleDelete = async (id: string) => {
    const { data, error } = await supabase
      .from("options")
      .delete()
      .eq("option_id", id)

    if (error && error.code !== "23503") {
      return toast.error(error.details)
    } else if (error) {
      return toast.error("Option is in use and cannot be deleted")
    }
    console.log(data)
    toast.success("Option deleted successfully")
    router.refresh()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Options Name</TableHead>
          <TableHead>Question Option Name</TableHead>
          <TableHead>Is Answer</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {options?.map((field) => (
          <TableRow>
            <TableCell className="font-medium">{field.option_label}</TableCell>
            <TableCell>{field.field.field_label}</TableCell>
            <TableCell>{field.field.isAnswer ? "Yes" : "No"}</TableCell>

            <TableCell>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(field.option_id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AnswersOptions
