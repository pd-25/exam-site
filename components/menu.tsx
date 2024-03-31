"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAtom } from "jotai"
import { Edit2Icon, FolderIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { menuEditAtom } from "@/hooks/useMenuEdit"
import { useSupabase } from "@/app/supabase_provider"

import BreadCrumb from "./breadcrumbs"

interface MenuItem {
  id: string
  name: string
  href: string
  parent_id: string | null
  children?: MenuItem[]
}

interface MenuProps {
  items: MenuItem[]
  level?: number // Used for indentation
}

const Menu: React.FC<MenuProps> = ({ items, level = 0 }) => {
  const [_, setValue] = useAtom(menuEditAtom)
  const router = useRouter()
  const { supabase } = useSupabase()
  const handleDelete = async (id: string) => {
    const { data, error } = await supabase.from("menus").delete().eq("id", id)
    if (error) {
      return toast.error(error.message)
    }
    toast.success("Menu item deleted successfully")
    router.refresh()
  }

  const handleEdit = (id: string) => {
    // Edit the menu item
    setValue(id)
  }
  return (
    <ul className="list-none pl-0">
      {items.map((item) => (
        <li key={item.id} className={`mb-1 ${level > 0 ? "ml-4" : ""}`}>
          <div className="flex items-center">
            <div className="mr-2 flex w-4 justify-end">
              {level > 0 && (
                <span className="h-full border-r-2 border-dotted border-gray-400" />
              )}
            </div>
            <FolderIcon className="size-5" />
            <a href={item.href} className="ml-2 hover:text-gray-900">
              {item.name}
            </a>
            {/* Edit and delete icons */}
            <button
              onClick={() => handleEdit(item.id)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              <Edit2Icon className="size-4" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
          {item.children && item.children.length > 0 && (
            <Menu items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default Menu
