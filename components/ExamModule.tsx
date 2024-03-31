"use client"

import React from "react"

import "survey-core/defaultV2.min.css"

import {useParams, useRouter} from "next/navigation"
import {toast} from "sonner"
import {Model} from "survey-core"
import {ContrastLight} from "survey-core/themes/contrast-light"
import {Survey} from "survey-react-ui"

import {useSupabase} from "@/app/supabase_provider"

const ExamModule: React.FC<{ user_id: string }> = ({user_id}) => {
  const [isAttended, setIsAttended] = React.useState(false)
  const {id} = useParams()
  const [json, setJson] = React.useState(null)
  const router = useRouter()
  const {supabase} = useSupabase()

  React.useEffect(() => {
    if (!id) return

    const fetchExam = async () => {
      const {data, error} = await supabase
        .from("questions")
        .select("question")
        .eq("exam_id", id)
        .single()
      if (error) {
        console.error("Error:", error)
        return
      }
      setJson(data.question)
    }
    const CheckIfAttended = async () => {
      const {data, error} = await supabase
        .from("userresponse")
        .select("*")
        .eq("exam_id", id)
        .eq("user_id", user_id)
        .single()
      if (error) {
        console.error("Error:", error)
        return
      }
      if (data) {
        setIsAttended(true)
      }
    }
    fetchExam()
    CheckIfAttended()

    return () => {
      setJson(null)
    }
  }, [id])

  if (!json) return null
  if (isAttended) {
    toast.error("You have already attended this exam")
    return router.back()
  }

  const survey = new Model(json)
  survey.applyTheme(ContrastLight)
  survey.onComplete.add(async (result) => {
    const {data, error} = await supabase.from("userresponse").insert([
      {
        exam_id: id,
        user_id,
        answer: JSON.stringify(result.data),
      },
    ])
    if (error) {
      console.log(error)
      return toast.error(error.message)
    }
    toast.success("Exam submitted successfully")
  })

  return (
    <div>
      <Survey model={survey}/>
    </div>
  )
}

export default ExamModule
