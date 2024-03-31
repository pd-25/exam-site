import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const optionSchema = z.object({
  field_id: z.string().min(1),
  option_label: z.string().min(1),
  isAnswer: z.boolean(),
})

export type Option = z.infer<typeof optionSchema>
export const optionResolver = zodResolver(optionSchema)
