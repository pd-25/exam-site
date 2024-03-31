"use client"

import * as React from "react"
import Link from "next/link"
import { Dropdown, DropdownItem } from "react-nested-dropdown"

import "react-nested-dropdown/dist/styles.css"

import { Session } from "@supabase/supabase-js"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MobileNav } from "@/components/mobile-nav"

import { UserAccountNav } from "./user-account-nav"

interface MainNavProps {
  items?: DropdownItem[]
  children?: React.ReactNode
  session?: Session | null
}

export function MainNav({ items, children, session }: MainNavProps) {
  const renderNavigationItems = (items: DropdownItem[]) => {
    return items.map((item) => {
      if (item.items && item.items.length > 0) {
        return (
          <Dropdown
            items={item.items}
            containerWidth="auto"
            closeOnScroll
            renderOption={(option) => {
              return (
                <NavigationMenuItem key={option.label} className="w-full">
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "w-full")}
                    href={item.value}
                  >
                    {option.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }}
          >
            {({ isOpen, onClick }) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger
                  className={navigationMenuTriggerStyle()}
                  onClick={onClick}
                >
                  {item.label}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            )}
          </Dropdown>
        )
      } else {
        return (
          <NavigationMenuItem key={item.label}>
            <Link
              href={item.value!}
              passHref
              legacyBehavior
              className={navigationMenuTriggerStyle()}
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )
      }
    })
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList inlist={""}>
          {items && renderNavigationItems(items!)}
          {!session ? (
            <NavigationMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <UserAccountNav
              user={{
                email: session.user.email,
                phone: session.user.phone,
                role: session.user.role,
                user_metadata: session.user.user_metadata,
              }}
            />
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <MobileNav items={items!} />
    </div>
  )
}
