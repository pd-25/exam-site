import BreadCrumb from "@/components/breadcrumbs"
import { UserClient } from "@/components/tables/user-tables/client"

const breadcrumbItems = [{ title: "Users", link: "/admin/users" }]
export default async function page() {
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UserClient />
    </div>
  )
}
