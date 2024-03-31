import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

import { getAllMenus, getSession } from "../supabase_server"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const sesssion = await getSession()

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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background container fixed z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <MainNav items={dropdownItems} session={sesssion} />
          <nav className="flex md:hidden">
            {sesssion ? (
              <UserAccountNav
                user={{
                  email: sesssion.user.email,
                  phone: sesssion.user.phone,
                  role: sesssion.user.role,
                  user_metadata: sesssion.user.user_metadata,
                }}
              />
            ) : (
              <Link
                href={"/login"}
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "md",
                  })
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
