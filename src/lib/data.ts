import type { ColumnDef } from "@tanstack/react-table"

export type User = {
  name: string
  email: string
  department: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  // {
  //   accessorKey: "actions",
  //   header: "",
  // },
]
