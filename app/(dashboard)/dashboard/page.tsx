import { DashboardHeader } from "@/components/header"
import SeriesItem from "@/components/SeriesItem"
import { DashboardShell } from "@/components/shell"
import { getAllSeries, getMyCourses, getSession } from "@/app/supabase_server"

export default async function DashboardPage() {
  const series = await getAllSeries()
  const session = await getSession()
  const courses = await getMyCourses({
    user_id: session?.user.id!,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Available Courses"
        text="A list of available courses for you to take."
      />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {series?.map((s) => (
            <SeriesItem
              key={s.id}
              s={s}
              user_id={session?.user.id}
              courses={courses}
            />
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
