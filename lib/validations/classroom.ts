import * as z from "zod"

export const selectSchema = z
  .object({
    value: z.string(),
    label: z.string(),
  })
  .required()

export const classroomSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name is too short")
      .max(255, "Name is too long"),
    classroomCategory: z.string({
      required_error: "Classroom Category is required",
    }),
    languages: z.array(selectSchema),
    offline_fee: z
      .number({ required_error: "Offline Fee is Required" })

      .min(10, "Fee can't be less than 10"),
    online_fee: z
      .number({ required_error: "Online Fee is Required" })
      .min(10, "Fee can't be less than 10"),
    batch_dates: z
      .array(z.date({ required_error: "Batch date is required" }))
      .min(1, "At least one batch date is required"),
  })
  .required()
