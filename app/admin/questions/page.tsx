import BreadCrumb from "@/components/breadcrumbs"
import QuestionCreator from "@/components/QuestionCreator"

const breadcrumbItems = [{ title: "Questions", link: "/admin/questions" }]
const page = async () => {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex">
        <QuestionCreator />
      </div>
    </div>
  )
}

export default page
