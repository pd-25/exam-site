import { cookies } from "next/headers"
import { Classroom, language } from "@/types"
import { MenuItem } from "@/utils/organizeMenu"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient, QueryData } from "@supabase/supabase-js"

export const createServerSupabaseClient = () => {
  cookies().getAll()
  return createServerComponentClient({ cookies })
}

export async function getSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAllUsers() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data: users, error } = await supabase.auth.admin.listUsers()
  if (error) {
    console.error("Error:", error)
    return null
  }
  return users
}

export async function getAllBanners() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: banners, error } = await supabase.from("banners").select("*")
    return banners
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAllMenus(): Promise<MenuItem[] | null> {
  const supabase = createServerSupabaseClient()
  try {
    const { data: menus, error } = await supabase.from("menus").select("*")
    return menus
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAllLanguages() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: languages, error } = await supabase
      .from("languages")
      .select("*")
    return languages as language[]
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAllClassrooms() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: classrooms, error } = await supabase
      .from("classrooms")
      .select("*")
    return classrooms as Classroom[]
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAllSeries() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: series, error } = await supabase
      .from("series")
      .select(`*,exam:exams(*)`)
    return series
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getAllExams() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: exams, error } = await supabase
      .from("exams")
      .select(
        `*,series:series_id(*),classroom:classroom_id(*),language:language_id(*)`
      )
    return exams
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getMyCourses({ user_id }: { user_id: string }) {
  const supabase = createServerSupabaseClient()
  try {
    const { data: courses, error } = await supabase
      .from("applications")
      .select(`*,exam:exam_id(*),series:exam_id(series_id(*))`)
      .eq("user_id", user_id)
    return courses
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function myCompletedExams({ user_id }: { user_id: string }) {
  const supabase = createServerSupabaseClient()
  try {
    const { data: exams, error } = await supabase
      .from("userresponse")
      .select(`*,exam:exam_id(*)`)
      .eq("user_id", user_id)
    return exams
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}
