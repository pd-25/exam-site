"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import { useSupabase } from "@/app/supabase_provider"

const BannerImage = ({ id, image, filename }) => {
  const { supabase } = useSupabase()
  const router = useRouter()

  const handleDelete = async (id) => {
    const { error: bannerError } = await supabase
      .from("banners")
      .delete()
      .eq("id", id)
    const { data, error } = await supabase.storage
      .from("banners")
      .remove([filename])
    if (error || bannerError) {
      toast.error("Failed to delete banner")
      return
    }

    if (data) {
      toast.success("Banner deleted successfully")
      router.refresh()
    }
  }
  return (
    <div className="relative aspect-video" key={id}>
      <Trash2
        className="absolute right-2 top-2 z-10 cursor-pointer rounded-full bg-white p-2 text-red-600"
        size={30}
        onClick={() => handleDelete(id)}
      />
      <Image
        src={image}
        alt="banner"
        fill
        className="rounded-lg object-cover"
      />
    </div>
  )
}

export default BannerImage
