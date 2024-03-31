"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Exam } from "@/types"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSupabase } from "@/app/supabase_provider"

import { Button } from "./ui/button"

const ExamItem = ({ exam }: { exam: Exam }) => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [questions, setQuestions] = React.useState<any[]>([])

  const deleteExam = async (id) => {
    const { data, error } = await supabase.from("exams").delete().eq("id", id)
    if (error) {
      toast.error(error.message)
    }
    toast.success("Exam deleted successfully")
    router.refresh()
  }

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("exam_id", exam.id)
      if (error) {
        toast.error(error.message)
      }
      setQuestions(data!)
    }
    fetchQuestions()

    return () => {
      setQuestions([])
    }
  }, [exam.id])

  return (
    <Card key={exam.id}>
      <CardHeader>
        <CardTitle>{exam.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {exam.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <b>Series:</b> {exam.series?.name}
        </p>
        <p>
          <b>Classroom:</b> {exam.classroom?.name}
        </p>
        <p>
          <b>Language:</b> {exam.language?.name}
        </p>
        <p>
          <b>Total Time:</b> {exam.total_time} Seconds{" "}
        </p>
        <p>
          <b>Time Per Page:</b> {exam.time_per_page} Seconds{" "}
        </p>
        <p>
          <b>Percentage:</b> {exam.percentage}%
        </p>
      </CardContent>
      <CardFooter className="flex w-full flex-col justify-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Button variant={"secondary"}>Edit</Button>
          <Button variant={"destructive"} onClick={() => deleteExam(exam.id)}>
            Delete
          </Button>
        </div>
        <div className="h-1 w-full border-b-2 border-dashed" />
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant={"outline"}
            onClick={() => {
              router.push(`/admin/exams/${exam.id}/questions`)
            }}
          >
            View Question
          </Button>
          <Button
            variant={"default"}
            disabled={questions.length > 0}
            onClick={() => {
              router.push(`/admin/exams/${exam.id}/add-question`)
            }}
          >
            Add Question
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ExamItem
