"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAtom } from "jotai"
import { toast } from "sonner"

import { menuEditAtom } from "@/hooks/useMenuEdit"
import { useSupabase } from "@/app/supabase_provider"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const MenuCreator: React.FC<{ items: any[] }> = ({ items }) => {
  const [value, setValue] = useAtom(menuEditAtom)
  const { supabase } = useSupabase()
  const [parentId, setParentId] = useState<string | null>(null)
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const hrefRef = useRef<HTMLInputElement>(null)

  const addItem = async ({ name, href, parent_id }) => {
    const { data, error } = await supabase
      .from("menus")
      .insert([{ name, href, parent_id }])

    if (error) {
      toast.error(error.message)
    }
    toast.success("Menu item added successfully")
    router.refresh()
  }

  const updateItem = async ({ name, href, parent_id }) => {
    const { data, error } = await supabase
      .from("menus")
      .update({ name, href, parent_id })
      .eq("id", value)
      .select()

    if (error) {
      toast.error(error.message)
    }
    toast.success("Menu item updated successfully")
    setValue(null)
    router.refresh()
  }

  useEffect(() => {
    if (value) {
      ;(async () => {
        const { data, error } = await supabase
          .from("menus")
          .select("*")
          .eq("id", value)
          .single()
        if (error) {
          toast.error(error.message)
        }
        setParentId(data.parent_id)
        if (nameRef.current) nameRef.current.value = data.name
        if (hrefRef.current) hrefRef.current.value = data.href
      })()
    }
  }, [value, supabase])

  return (
    <form
      className="flex w-full flex-col justify-center gap-4 p-6"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement

        const formData = new FormData(form)
        const name = formData.get("name") as string
        const href = formData.get("href") as string
        if (value) {
          updateItem({ name, href, parent_id: parentId! })
        } else {
          addItem({ name, href, parent_id: parentId! })
        }
        setParentId(null)
        form.reset()
      }}
    >
      <Input name="name" placeholder="Name" ref={nameRef} />
      <Input name="href" placeholder="Href" ref={hrefRef} />
      <Select
        name="parent_id"
        value={parentId!}
        onValueChange={(value) => {
          setParentId(value)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Parent Menu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Menu</SelectLabel>
            {items.map((item, index) => (
              <SelectItem value={item.id} key={index}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default MenuCreator
