import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="size-full pt-16">{children}</main>
      </div>
    </>
  )
}
