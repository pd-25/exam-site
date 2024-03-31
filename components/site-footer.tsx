import * as React from "react"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

import { Button } from "./ui/button"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        className,
        "bg-background relative mx-auto my-10 w-full py-10 text-center"
      )}
    >
      <div className="flex flex-col items-center justify-between space-y-6 px-6 pb-5">
        <h2 className="text-3xl font-bold leading-snug xl:text-4xl">
          India&apos;s Top Coaching Institute for UPSC CSE
        </h2>
        <p className="lg:px-40">
          We provide comprehensive General Studies Foundation Course, Prelims &
          Mains Test Series, One-to-One Mentorship, Current Affairs and much
          more to help you achieve your IAS Dream.
        </p>
        <Button
          variant={"default"}
          className="rounded-full px-12 py-7 text-xl"
          size={"lg"}
        >
          Get started
        </Button>
        <div className="flex justify-center space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
              className=""
              width={30}
              height={30}
              alt="Facebook"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
              className=""
              width={30}
              height={30}
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
              className=""
              width={30}
              height={30}
              alt="Instagram"
            />
          </a>
          <a
            href="https://messenger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"
              className=""
              width={30}
              height={30}
              alt="Messenger"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://img.icons8.com/fluent/30/000000/twitter.png"
              className=""
              width={30}
              height={30}
              alt="Twitter"
            />
          </a>
        </div>
        <div className="">
          <nav className="flex flex-wrap justify-center text-lg font-medium">
            <div className="px-5 py-2">
              <a href="#">Contact</a>
            </div>
            <div className="px-5 py-2">
              <a href="#">Pricing</a>
            </div>
            <div className="px-5 py-2">
              <a href="#">Privacy</a>
            </div>
            <div className="px-5 py-2">
              <a href="#">Terms</a>
            </div>
            <div className="px-5 py-2">
              <a href="#">Twitter</a>
            </div>
          </nav>
          <p className="mt-7 text-base">
            © {new Date().getFullYear()}, {siteConfig.name}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 m-6">
        <ModeToggle />
      </div>
    </footer>
  )
}
