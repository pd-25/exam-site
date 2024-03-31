"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Course } from "@/types"
import { generatePDF } from "@/utils/downloadPDF"
import { Download, MoreHorizontal, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps {
  data: Course
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  console.log(data)

  const onConfirm = async () => {}

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/courses/${data.exam_id}`)}
            disabled={
              data.completedExams.find(
                (item) => item.exam_id === data.exam_id
              ) !== undefined
            }
          >
            <Pencil className="mr-2 size-4" /> Attend
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              generatePDF(
                JSON.parse(
                  data.completedExams.find(
                    (item) => item.exam_id === data.exam_id
                  )?.answer
                )
              )
            }
            disabled={
              data.completedExams.find(
                (item) => item.exam_id === data.exam_id
              ) === undefined
            }
          >
            <Download className="mr-2 size-4" /> Download Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
