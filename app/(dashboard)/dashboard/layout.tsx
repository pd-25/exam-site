import Link from "next/link"
import { notFound } from "next/navigation"
import { organizeItems } from "@/utils/organizeMenu"

import { dashboardConfig } from "@/config/dashboard"
import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"
import { getAllMenus, getSession } from "@/app/supabase_server"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getSession()
  const menus = await getAllMenus()

  const buildDropdownItems = (items, parentId = null) =>
    items
      .filter((item) => item.parent_id === parentId)
      .map((item) => ({
        label: item.name,
        value: item.href,
        items: buildDropdownItems(items, item.id),
      }))

  const dropdownItems = buildDropdownItems(menus)

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <MainNav items={dropdownItems} session={user} />
          <div className="flex md:hidden">
            <UserAccountNav
              user={{
                user_metadata: user.user.user_metadata,
                email: user.user.email,
                phone: user.user.phone,
                role: user.user.role,
              }}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
