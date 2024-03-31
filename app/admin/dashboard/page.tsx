import { ScrollArea } from "@/components/ui/scroll-area"
import { getSession } from "@/app/supabase_server"

export default async function page() {
  const session = await getSession()
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back {session?.user.user_metadata.full_name}👋
          </h2>
        </div>
      </div>
    </ScrollArea>
  )
}
