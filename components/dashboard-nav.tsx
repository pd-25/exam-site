"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem } from "@/types"
import { ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Button } from "./ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"

interface DashboardNavProps {
  items: NavItem[]
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        if (item.items) {
          return (
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full"
            >
              <div className="flex w-full">
                <Link
                  href={item.disabled ? "/" : item.href!}
                  onClick={() => {
                    if (setOpen) setOpen(false)
                  }}
                  className="flex-1"
                >
                  <span
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <Icon className="mr-2 size-4" />
                    <span>{item.label}</span>
                  </span>
                </Link>
                <CollapsibleTrigger>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="size-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-2">
                <DashboardNav items={item.items} setOpen={setOpen} />
              </CollapsibleContent>
            </Collapsible>
          )
        }
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false)
              }}
            >
              <span
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 size-4" />
                <span>{item.label}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
