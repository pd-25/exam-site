import React from "react"
import { Plus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import AddSeries from "@/components/series-add"
import { getAllSeries } from "@/app/supabase_server"

const breadcrumbItems = [{ title: "Test Series", link: "/admin/series" }]
const page = async () => {
  const series = await getAllSeries()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between overflow-y-scroll">
        <Heading title="Test Series" description="Manage Test Series" />
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" /> Add New
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Add Test Series</SheetTitle>
              <SheetDescription>
                Add new Test Series to your website.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <AddSeries />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {series?.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <CardTitle>{s.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h5>List of exams</h5>
              <Accordion type="single" collapsible className="w-full">
                {s?.exam?.map((item) => {
                  return (
                    <AccordionItem value={item.id} key={item.id}>
                      <AccordionTrigger>{item.name}</AccordionTrigger>
                      <AccordionContent>
                        <p className="line-clamp-4">{item.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </CardContent>
            <CardFooter className="flex w-full justify-center space-x-3">
              <Button variant={"secondary"}>Edit</Button>
              <Button variant={"destructive"}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default page
