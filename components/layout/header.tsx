import Link from "next/link"

import { cn } from "@/lib/utils"
import { getSession } from "@/app/supabase_server"

import { ModeToggle } from "../mode-toggle"
import { UserAccountNav } from "../user-account-nav"
import { MobileSidebar } from "./mobile-sidebar"

export default async function Header() {
  const session = await getSession()
  return (
    <div className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed inset-x-0 top-0 z-20 border-b backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 size-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserAccountNav
            user={{
              user_metadata: session?.user?.user_metadata!,
              email: session?.user?.email,
              phone: session?.user?.phone,
              role: session?.user?.role,
            }}
          />
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}
