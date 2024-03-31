import jsPDF from "jspdf"
import autoTable, { RowInput } from "jspdf-autotable"

export const generatePDF = (data) => {
  const doc = new jsPDF()
  const tableRow: RowInput[] = []
  Object.keys(data).forEach((key) => {
    tableRow.push([key, data[key]])
  })
  autoTable(doc, {
    head: [["Question", "Answer"]],
    body: tableRow,
  })
  doc.save("answer.pdf")
}
