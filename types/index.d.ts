import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
  items?: NavItem[]
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

export type language = {
  id: string
  name: string
  createdAt: string
}

export interface Classroom {
  id: number
  created_at: Date
  name: string
  offline_fee: number
  online_fee: number
  batch_dates: Date[]
  languages: number[]
  category: string
}

// Assuming these are defined in your validations or somewhere similar
export interface Option {
  id: string
  label: string
}

export interface Field {
  id: string
  type: string
  label: string
  options?: Option[]
}

export interface Step {
  title: string
  fields: Field[]
}

export interface Question {
  surveyName: string
  surveySlug: string
  surveySteps: Step[]
}

export interface Course {
  application_id: number
  user_id: string
  exam_id: number
  application_date: string
  exam: Exam
  exam_status: string
  completedExams: any[]
  series: {
    series_id: {
      id: number
      name: string
      created_at: string
    }
  }
}

export interface Exam {
  id: number
  name: string
  series_id: number
  created_at: string
  percentage: string
  total_time: string
  description: string
  language_id: number
  classroom_id: number
  time_per_page: number
  series?: { id: number; name: string; created_at: string }
  classroom?: Classroom
  language?: language
}
