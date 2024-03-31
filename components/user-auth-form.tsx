"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useSupabase } from "@/app/supabase_provider"

import Otp from "./ui/otp"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const { supabase } = useSupabase()
  const [sentOTP, setSentOTP] = React.useState(false)
  const [otp, setOtp] = React.useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function sendOTP(formData: FormData) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formData.phone,
      })
      if (error) {
        toast.error(error.message)
      }
      toast.success("We have sent you an OTP. Please verify your phone number.")
      setSentOTP(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function verifyOTP(formData: FormData) {
    try {
      const {
        error,
        data: { session },
      } = await supabase.auth.verifyOtp({
        phone: formData.phone,
        token: otp.toString(),
        type: "sms",
      })

      if (error) {
        return toast.error(error.message)
      }
      toast.success("OTP verified successfully")
      if (session?.user.user_metadata?.role === "admin") {
        return router.replace("/admin/dashboard")
      } else {
        return router.replace("/dashboard")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function onSubmit(formData: FormData) {
    if (sentOTP) {
      return verifyOTP(formData)
    }
    return sendOTP(formData)
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              type="number"
              autoCapitalize="none"
              autoComplete="phone"
              autoCorrect="off"
              disabled={isSubmitting || sentOTP}
              maxLength={10}
              {...register("phone")}
            />
            {errors?.phone && (
              <p className="px-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {sentOTP && (
            <div className="grid gap-3">
              <Label htmlFor="password">Enter OTP</Label>
              <Otp
                onOtpChange={(otp) => {
                  setOtp(otp)
                }}
                length={7}
                otp={otp}
              />
            </div>
          )}

          <button
            className={cn(buttonVariants())}
            disabled={isSubmitting || (sentOTP && otp.toString().length < 7)}
          >
            {isSubmitting && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {sentOTP ? "Verify OTP" : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  )
}
