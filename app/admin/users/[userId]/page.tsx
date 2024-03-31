"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient, User } from "@supabase/supabase-js"

import { ScrollArea } from "@/components/ui/scroll-area"
import BreadCrumb from "@/components/breadcrumbs"
import { UserNameForm } from "@/components/user-name-form"

export default function Page() {
  const params = useParams<{ userId: string }>()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  )
  useEffect(() => {
    ;(async () => {
      if (!params.userId) return
      const { data, error } = await supabase.auth.admin.getUserById(
        params.userId!
      )
      if (error) {
        console.error(error)
        return
      }
      setUser(data.user)
    })()
  }, [supabase, params.userId])

  const breadcrumbItems = [
    { title: "User", link: "admin/users" },
    { title: "Edit User", link: `admin/users/${params.userId}` },
  ]

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserNameForm
          user={{
            id: params.userId,
            user_metadata: user?.user_metadata!,
            email: user?.email!,
          }}
        />
      </div>
    </ScrollArea>
  )
}
