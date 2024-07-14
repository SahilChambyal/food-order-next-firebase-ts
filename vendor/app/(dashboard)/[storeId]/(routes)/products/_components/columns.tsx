"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumns = {
  id: string,
  name: string,
  price: string,
  isFeatured: boolean,
  isArchived: boolean,
  images: {url: string}[],
  category: string,
  size: string,
  kitchen: string,
  cuisine: string,
  createdAt?: string,
}

export const columns: ColumnDef<ProductColumns>[] = [

  {
    accessorKey: "name",
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
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "isArchived",
    header: "Archived"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "size",
    header: "Size"
  },
  {
    accessorKey: "kitchen",
    header: "Kitchen"
  },
  {
    accessorKey: "cuisine",
    header: "Cuisine"
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
