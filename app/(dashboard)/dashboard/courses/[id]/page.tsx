import ExamModule from "@/components/ExamModule"
import { DashboardShell } from "@/components/shell"
import { getSession } from "@/app/supabase_server"

const page = async () => {
  const session = await getSession()
  return (
    <DashboardShell>
      <ExamModule user_id={session?.user.id!} />
    </DashboardShell>
  )
}

export default page
