import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export const seriesSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters"),
})

export type Series = z.infer<typeof seriesSchema>
export const SeriesResolver = zodResolver(seriesSchema)
