"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellImage } from "./cell-image";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardsColumns = {
    id: string,
    label: string,
    imageUrl: string,
    createdAt: string,
}

export const columns: ColumnDef<BillboardsColumns>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({row}) => {
        const {imageUrl} = row.original;

        return(
            <CellImage imageUrl={imageUrl}/>
        )
    }
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
