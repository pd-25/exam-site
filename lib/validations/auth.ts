import * as z from "zod"

export const userAuthSchema = z.object({
  phone: z.string().min(10),
})
