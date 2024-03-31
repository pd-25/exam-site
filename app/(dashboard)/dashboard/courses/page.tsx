import React from "react"

import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { columns } from "@/components/tables/employee-tables/columns"
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table"
import {
  getMyCourses,
  getSession,
  myCompletedExams,
} from "@/app/supabase_server"

const page = async () => {
  const session = await getSession()
  const courses = await getMyCourses({
    user_id: session?.user.id!,
  })
  const completedExams = await myCompletedExams({
    user_id: session?.user.id!,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Courses"
        text="Manage your courses and view your progress."
      />

      <div className="mx-2">
        <EmployeeTable
          columns={columns}
          data={
            courses?.map((item) => {
              return {
                ...item,
                completedExams,
              }
            }) || []
          }
          pageCount={1}
          pageNo={0}
          searchKey="exam.name"
          totalUsers={courses?.length || 0}
        />
      </div>
    </DashboardShell>
  )
}

export default page
