import React from "react"
import { organizeItems } from "@/utils/organizeMenu"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import BreadCrumb from "@/components/breadcrumbs"
import Menu from "@/components/menu"
import MenuCreator from "@/components/menu-creator"
import { getAllMenus } from "@/app/supabase_server"

const breadcrumbItems = [{ title: "Menus", link: "/admin/menu" }]
const page: React.FC = async () => {
  const items = await getAllMenus()

  const organizeItemsData = organizeItems(items!)

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Heading title="Menus" description="Manage Menus" />
      <section className="flex items-center justify-between gap-3 p-5">
        <Card className="flex w-full flex-col items-start gap-2">
          <CardHeader>
            <CardTitle>Header Menus</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="list-none pl-5">
              <Menu items={organizeItemsData} />
            </ul>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Header Menus</CardTitle>
          </CardHeader>
          <CardContent>
            <MenuCreator items={items!} />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default page
