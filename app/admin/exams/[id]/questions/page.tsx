import { Heading } from "@/components/ui/heading"
import BreadCrumb from "@/components/breadcrumbs"
import QuestionEditor from "@/components/QuestionEditor"
import QuestionTable from "@/components/tables/question-table/table"

const breadcrumbItems = [{ title: "Exams", link: "/admin/exams" }]
const page = async () => {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-start justify-between overflow-y-scroll">
        <Heading title="Questions" description="Manage Questions" />
      </div>
      <QuestionEditor />
    </div>
  )
}

export default page
