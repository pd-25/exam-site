import { NavItem } from "@/types"

export type User = {
  id: number
  name: string
  company: string
  role: string
  verified: boolean
  status: string
}

export type Employee = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: string // Consider using a proper date type if possible
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  longitude?: number // Optional field
  latitude?: number // Optional field
  job: string
  profile_picture?: string | null // Profile picture can be a string (URL) or null (if no picture)
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "user",
    label: "Users",
  },
  {
    title: "Banners",
    href: "/admin/banners",
    icon: "gallery",
    label: "Banners",
  },
  {
    title: "Menu",
    href: "/admin/menu",
    icon: "menu",
    label: "Menu",
  },
  {
    title: "Classrooms",
    href: "/admin/classrooms",
    icon: "school",
    label: "Classrooms",
  },
  {
    title: "Test Series",
    href: "/admin/series",
    icon: "school",
    label: "Test Series",
    items: [
      {
        title: "Exams",
        href: "/admin/exams",
        icon: "school",
        label: "Exams",
      },
      // {
      //   title: "Questions",
      //   href: "/admin/questions",
      //   icon: "school",
      //   label: "Questions",
      //   items: [
      //     {
      //       title: "Question Options",
      //       href: "/admin/questions/fields",
      //       icon: "school",
      //       label: "Question Options",
      //     },
      //     {
      //       title: "Answer Options",
      //       href: "/admin/questions/options",
      //       icon: "school",
      //       label: "Answer Options",
      //     },
      //   ],
      // },
    ],
  },
]
