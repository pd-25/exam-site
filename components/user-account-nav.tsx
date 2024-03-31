"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { useSupabase } from "@/app/supabase_provider"

import { toast } from "./ui/use-toast"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "phone" | "role" | "email" | "user_metadata">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const router = useRouter()
  const supabase = useSupabase()
  const logout = async () => {
    const { error } = await supabase.supabase.auth.signOut()
    if (error) {
      return toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
    router.refresh()
    toast({
      title: "Logged out",
      description: "You have been logged out",
      variant: "default",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.phone || null, image: "" || null }}
          className="size-10"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.user_metadata && (
              <p className="font-medium">{user.user_metadata.full_name}</p>
            )}
            {user.email && (
              <p className="text-muted-foreground w-[200px] truncate text-sm">
                {user.email}
              </p>
            )}
          </div>
        </div>
        {user.user_metadata.role === "user" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {user.user_metadata.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">Go to Admin</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            logout()
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
