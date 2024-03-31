import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export const fieldSchema = z.object({
  step_id: z.string().min(1),
  field_type: z.string().min(1),
  field_label: z.string().min(1),
  select_multiple: z.boolean(),
})

export type Field = z.infer<typeof fieldSchema>
export const fieldResolver = zodResolver(fieldSchema)
