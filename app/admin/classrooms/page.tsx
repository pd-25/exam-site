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
import BreadCrumb from "@/components/breadcrumbs"
import ClassItem from "@/components/ClassItem"
import ClassRoomForm from "@/components/classroom-create-form"
import { getAllClassrooms, getAllLanguages } from "@/app/supabase_server"

const breadcrumbItems = [{ title: "Classrooms", link: "/admin/classrooms" }]
const page = async () => {
  const languages = await getAllLanguages()
  const classrooms = await getAllClassrooms()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between overflow-y-scroll">
        <Heading title="Classrooms" description="Manage Classrooms" />
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" /> Add New
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Add Classroom</SheetTitle>
              <SheetDescription>
                Add new classroom to your website.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <ClassRoomForm
                languages={
                  languages?.map((item) => {
                    return { label: item.name, value: parseInt(item.id) }
                  })!
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-3 gap-3 overflow-auto">
        {classrooms?.map((classroom) => {
          return <ClassItem key={classroom.id} classroom={classroom} isEdit />
        })}
      </div>
    </div>
  )
}

export default page
