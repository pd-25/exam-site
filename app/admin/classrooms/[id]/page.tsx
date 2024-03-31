"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Classroom, language } from "@/types"
import { toast } from "sonner"

import ClassRoomForm from "@/components/classroom-create-form"
import { useSupabase } from "@/app/supabase_provider"

const ClassroomEdit = () => {
  const [languages, setLanguages] = useState<language[]>([])
  const { id } = useParams<{ id: string }>()
  const { supabase } = useSupabase()
  const [classroom, setClassroom] = useState<Classroom | null>(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      const { data } = await supabase.from("languages").select("*")
      setLanguages(data!)
    }

    const fetchClassroom = async () => {
      const { data, error } = await supabase
        .from("classrooms")
        .select("*")
        .eq("id", id)
      if (error) {
        return toast.error(error.message)
      }
      setClassroom(data![0])
    }

    fetchLanguages()
    fetchClassroom()

    return () => {
      setLanguages([])
      setClassroom(null)
    }
  }, [id])

  if (!languages || !classroom) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-5">
      <ClassRoomForm
        languages={
          languages.map((item) => {
            return { label: item.name, value: parseInt(item.id) }
          })!
        }
        classroom={classroom!}
      />
    </div>
  )
}

export default ClassroomEdit
