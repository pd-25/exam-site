import { Montserrat as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/styles/globals.css"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import SupabaseProvider from "./supabase_provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SupabaseProvider>
            {children}
            <Analytics />
            <Toaster />
            <TailwindIndicator />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
