"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/app/supabase_provider"

const SeriesItem = ({ s, user_id, courses }) => {
  const router = useRouter()
  const { supabase } = useSupabase()

  const handleApply = async (exam_id: string) => {
    const { data, error } = await supabase
      .from("applications")
      .insert([{ exam_id, user_id, application_date: new Date() }])
    if (error) {
      return toast.error(error.message)
    }
    router.refresh()
    return toast.success("Successfully applied!")
  }
  return (
    <Card key={s.id}>
      <CardHeader className="rounded-lg">
        <CardTitle>{s.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {s?.exam?.map((item) => {
            const isApplied = courses?.find((c) => c.exam.id === item.id)
            return (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger>{item.name}</AccordionTrigger>
                <AccordionContent>
                  <p className="line-clamp-4">{item.description}</p>
                  <div className="m-2 flex items-center justify-center space-x-3">
                    <Button
                      variant={"default"}
                      onClick={() => !isApplied && handleApply(item.id)}
                    >
                      {isApplied ? "Applied" : "Apply"}
                    </Button>
                    <Button
                      variant={"secondary"}
                      onClick={() => router.push(`/series/${s.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default SeriesItem
