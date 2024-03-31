import React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AddExams from "@/components/addExams"
import BreadCrumb from "@/components/breadcrumbs"
import ExamItem from "@/components/ExamItem"
import {
  getAllClassrooms,
  getAllExams,
  getAllLanguages,
  getAllSeries,
} from "@/app/supabase_server"

const breadcrumbItems = [{ title: "Exams", link: "/admin/exams" }]
const page = async () => {
  const series = await getAllSeries()
  const languages = await getAllLanguages()
  const classrooms = await getAllClassrooms()
  const exams = await getAllExams()
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between overflow-y-scroll">
        <Heading title="Exams" description="Manage Exams" />
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" /> Add New
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Add Exam</SheetTitle>
              <SheetDescription>
                Add new Exam Series to your website.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <AddExams
                languages={languages?.map((item) => {
                  return { label: item.name, value: item.id.toString() }
                })}
                classrooms={classrooms?.map((item) => {
                  return { label: item.name, value: item.id.toString() }
                })}
                series={series?.map((item) => {
                  return { label: item.name, value: item.id.toString() }
                })}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {exams?.map((s) => <ExamItem key={s.id} exam={s} />)}
      </div>
    </div>
  )
}

export default page
