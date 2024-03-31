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

const OptionsTable = ({ fields }) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const handleDelete = async (id: string) => {
    const { data, error } = await supabase
      .from("fields")
      .delete()
      .eq("field_id", id)

    if (error && error.code !== "23503") {
      return toast.error(error.details)
    } else if (error) {
      return toast.error("Field is in use and cannot be deleted")
    }
    console.log(data)
    toast.success("Field deleted successfully")
    router.refresh()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Multiple</TableHead>
          <TableHead>Question Title</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields?.map((field) => (
          <TableRow>
            <TableCell className="font-medium">{field.field_label}</TableCell>
            <TableCell>{field.field_type}</TableCell>
            <TableCell>{field.select_multiple ? "Yes" : "No"}</TableCell>
            <TableCell>{field.step.title}</TableCell>
            <TableCell>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(field.field_id)}
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

export default OptionsTable
