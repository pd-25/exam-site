"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
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

const QuestionTable = () => {
  const { id } = useParams()
  const [questions, setQuestions] = React.useState<any[]>([])
  const { supabase } = useSupabase()
  const router = useRouter()

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select(`*,exam:exam_id(*)`)
        .eq("exam_id", id)
      if (error) {
        toast.error(error.message)
      }
      setQuestions(data!)
    }
    fetchQuestions()

    return () => {
      setQuestions([])
    }
  }, [id])

  const handleDelete = async (id: string) => {
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id)

    if (error && error.code !== "23503") {
      return toast.error(error.details)
    } else if (error) {
      return toast.error("Question is in use and cannot be deleted")
    }
    toast.success("Question deleted successfully")
    router.back()
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Exam Name</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions?.map((field) => (
          <TableRow>
            <TableCell className="font-medium">{field.exam.name}</TableCell>
            <TableCell>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(field.id)}
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

export default QuestionTable
