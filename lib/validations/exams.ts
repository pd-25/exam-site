import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export const examsSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, "Description must be at least 3 characters"),
  series_id: z
    .string({ required_error: "Series is required" })
    .min(1, "Series must be at least 1 characters"),

  classroom_id: z
    .string({ required_error: "Classroom is required" })
    .min(1, "Classroom must be at least 1 characters"),
  language_id: z
    .string({ required_error: "Language is required" })
    .min(1, "Language must be at least 1 characters"),
  total_time: z.number({ required_error: "Duration is required" }),
  time_per_page: z.number({ required_error: "Time per page is required" }),
  percentage: z.string({ required_error: "Percentage is required" }).min(1),
})

export type Exams = z.infer<typeof examsSchema>
export const ExamsResolver = zodResolver(examsSchema)
