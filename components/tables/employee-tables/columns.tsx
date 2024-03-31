"use client"

import { Course } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "exam.name",
    header: "EXAM NAME",
  },
  {
    cell: ({ row }) => (
      <h3 className="line-clamp-2">{row.original.series.series_id.name}</h3>
    ),
    header: "SERIES NAME",
  },
  {
    cell: ({ row }) => (
      <div className={"w-44"}>
        <h3 className="line-clamp-1 break-words">
          {row.original.exam.description}
        </h3>
      </div>
    ),
    header: "DESCRIPTION",
  },
  {
    cell: ({ row }) => (
      <h3 className="line-clamp-2">
        {row.original.exam.time_per_page} seconds{" "}
      </h3>
    ),
    header: "TIME PER PAGE",
  },
  {
    cell: ({ row }) => (
      <h3 className="line-clamp-2">{row.original.exam.total_time} seconds </h3>
    ),
    header: "TOTAL TIME",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
