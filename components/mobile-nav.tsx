"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { NavItem } from "@/types"
import { MenuItem } from "@/utils/organizeMenu"
import { DropdownItem } from "react-nested-dropdown"

import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export function MobileNav({ items }: { items: DropdownItem[] }) {
  const [open, setOpen] = React.useState(false)
  const renderNavItems = (items: DropdownItem[]) => {
    return items?.map((item) => {
      if (item.items && item.items.length > 0) {
        return (
          <Accordion
            title={item.label}
            className="space-y-0 p-0"
            type="multiple"
            key={item.label}
          >
            <AccordionItem
              value="item1"
              className="
              block
              select-none
              space-y-1
              rounded-md
              border-b-0
              py-3
              pl-3
              text-base
              leading-none
              no-underline
              outline-none
              transition-colors
            "
            >
              <AccordionTrigger className="w-full py-0">
                <MobileLink href={item.value!} onOpenChange={setOpen}>
                  {item.label}
                </MobileLink>
              </AccordionTrigger>
              <AccordionContent>
                <ul>{renderNavItems(item.items)}</ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      } else {
        return (
          <li
            className="
              hover:bg-accent
              hover:text-accent-foreground
              focus:bg-accent
              focus:text-accent-foreground
              block
              select-none
              space-y-1
              rounded-md
              py-3
              pl-3
              text-base
              leading-none
              no-underline
              outline-none
              transition-colors
            "
            key={item.label}
          >
            <MobileLink href={item.value!} onOpenChange={setOpen}>
              {item.label}
            </MobileLink>
          </li>
        )
      }
    })
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="md:hidden">
          <Icons.logo />
          <span className="font-bold">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[80vw]">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 size-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">{renderNavItems(items)}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className, "no-underline")}
      {...props}
    >
      {children}
    </Link>
  )
}
