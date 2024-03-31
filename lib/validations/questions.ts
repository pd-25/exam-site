import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const questionSchema = z.object({
  title: z.string().min(3).max(255),
  exam_id: z.string().min(1).max(255),
})

export type Question = z.infer<typeof questionSchema>

export const questionResolver = zodResolver(questionSchema)
