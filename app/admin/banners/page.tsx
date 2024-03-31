import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BannerImage from "@/components/banner-image"
import BreadCrumb from "@/components/breadcrumbs"
import DropzoneFiles from "@/components/dropzone-file"
import {
  createServerSupabaseClient,
  getAllBanners,
} from "@/app/supabase_server"

const breadcrumbItems = [{ title: "Banners", link: "/admin/banners" }]
const Banners = async () => {
  const supabase = createServerSupabaseClient()
  const banners = await getAllBanners()
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title="Banners" description="Manage banners" />
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" /> Add New
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Banners</SheetTitle>
              <SheetDescription>
                Add new banners to your website. You can add up to 4 banners.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <DropzoneFiles />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {banners?.map((banner) => {
          const path = supabase.storage.from("banners").getPublicUrl(banner.url)
          return (
            <BannerImage
              id={banner.id}
              image={path.data.publicUrl}
              filename={`/${banner.url}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Banners
