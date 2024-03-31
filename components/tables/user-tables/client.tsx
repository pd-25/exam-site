import { User } from "@supabase/supabase-js"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { getAllUsers } from "@/app/supabase_server"

import { columns } from "./columns"

export const UserClient = async () => {
  const data = await getAllUsers()
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data?.users.length})`}
          description="Manage users in your application."
        />
      </div>
      <Separator />
      <DataTable searchKey="phone" columns={columns} data={data?.users!} />
    </>
  )
}
