"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react"

import "survey-core/defaultV2.min.css"
import "survey-creator-core/survey-creator-core.min.css"

import { Exam } from "@/types"

import { useSupabase } from "@/app/supabase_provider"

const QuestionEditor = () => {
  const { id } = useParams()
  const [exam, setExam] = useState<Exam | null>(null)
  const [json, setJson] = React.useState(null)
  const { supabase } = useSupabase()

  React.useEffect(() => {
    if (!id) return

    const fetchExam = async () => {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .eq("id", id)
      if (error) {
        toast.error(error.message)
        return
      }
      setExam(data![0])
    }
    fetchExam()

    return () => {
      setExam(null)
    }
  }, [id])

  React.useEffect(() => {
    const fetchQuestion = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("question")
        .eq("exam_id", id)
      if (error) {
        return toast.error(error.message)
      }
      setJson(data[0].question)
    }
    fetchQuestion()

    return () => {
      setJson(null)
    }
  }, [id, supabase])

  const creator = new SurveyCreator({
    showJSONEditorTab: false,
    showEmbededSurveyTab: false,
    showTranslationTab: false,
    showOptions: false,
    theme: "contrast-light",
  })
  creator.JSON = json
  creator.saveSurveyFunc = async (saveNo, callback) => {
    const { data, error } = await supabase
      .from("questions")
      .update({
        question: creator.JSON,
      })
      .eq("exam_id", id)
    if (error) {
      toast.error(error.message)
      callback(saveNo, false)
      return
    }
    callback(saveNo, true)
    return toast.success("Question updated successfully")
  }

  if (!json) return null

  return <SurveyCreatorComponent creator={creator} />
}

export default QuestionEditor
