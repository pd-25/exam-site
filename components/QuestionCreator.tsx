"use client"

import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react"

import "survey-core/defaultV2.min.css"
import "survey-creator-core/survey-creator-core.min.css"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Exam } from "@/types"
import { toast } from "sonner"

import { useSupabase } from "@/app/supabase_provider"

const QuestionCreator = () => {
  const { id } = useParams()
  const [exam, setExam] = useState<Exam | null>(null)
  const { supabase } = useSupabase()
  const creatorOptions = {
    showLogicTab: false,
    isAutoSave: true,
  }
  useEffect(() => {
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

  const creator = new SurveyCreator({
    showJSONEditorTab: false,
    showEmbededSurveyTab: false,
    showTranslationTab: false,
    showOptions: false,
    showPropertyGrid: "right",
    theme: "contrast-light",
    creatorOptions,
  })
  creator.JSON = {
    maxTimeToFinish: exam?.total_time,
    maxTimeToFinishPage: exam?.time_per_page,
    showTimerPanel: "top",
  }

  creator.saveSurveyFunc = async (saveNo, callback) => {
    const { data, error } = await supabase.from("questions").insert({
      exam_id: id,
      question: creator.JSON,
    })
    if (error) {
      toast.error(error.message)
      callback(saveNo, false)
      return
    }
    callback(saveNo, true)
    return toast.success("Question added successfully")
  }
  return <SurveyCreatorComponent creator={creator} />
}

export default QuestionCreator
