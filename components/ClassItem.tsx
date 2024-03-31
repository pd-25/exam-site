"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Classroom, language } from "@/types"
import { Languages } from "lucide-react"
import { toast } from "sonner"

import { useSupabase } from "@/app/supabase_provider"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"

const ClassItem: React.FC<{ classroom: Classroom; isEdit?: boolean }> = ({
  classroom,
  isEdit = false,
}) => {
  const [language, setLanguage] = useState<language[]>([])
  const { supabase } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const fetchLanguages = async () => {
      classroom.languages.forEach(async (element) => {
        const { data, error } = await supabase
          .from("languages")
          .select("*")
          .eq("id", element)
        if (error) {
          return toast.error(error.message)
        }
        setLanguage(data!)
      })
    }
    fetchLanguages()

    return () => {
      setLanguage([])
    }
  }, [classroom.id])

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("classrooms")
        .delete()
        .eq("id", classroom.id)

      if (error) {
        return toast.error(error.message)
      }

      toast.success("Classroom deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Card>
      <CardContent className="relative overflow-hidden p-2">
        <div className="p-6">
          <h2 className="font-bold capitalize">{classroom?.name}</h2>
          <p className="text-muted-foreground line-clamp-2 text-sm font-bold">
            {classroom.category}
          </p>
          {language.length > 0 &&
            language.map((item) => {
              return (
                <div className="flex items-center justify-center gap-2 p-4">
                  <Languages className="size-5" />
                  <span className="text-muted-foreground">{item?.name}</span>
                </div>
              )
            })}
          <h4>
            Offline Fee -{" "}
            <span className="font-bold">₹ {classroom?.offline_fee}</span>
          </h4>
          <h4>
            Online Fee -{" "}
            <span className="font-bold">₹ {classroom?.online_fee}</span>
          </h4>
          <div className="border-1 m-5 border" />
          <p className="font-bold">Regular Batch Date</p>
          <div className="grid grid-cols-2">
            {classroom.batch_dates.map((date) => {
              return <span>{new Date(date).toDateString()}</span>
            })}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {isEdit ? (
          <div className="flex w-full items-end justify-end space-x-3">
            <Button
              variant={"default"}
              className="w-full"
              onClick={() => {
                router.push(`/admin/classrooms/${classroom.id}`)
              }}
            >
              Edit
            </Button>
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Button variant={"default"} className="m-2 w-full">
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ClassItem
