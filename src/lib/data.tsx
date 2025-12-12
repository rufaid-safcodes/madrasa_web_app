import type { ColumnDef } from "@tanstack/react-table"

export type User = {
  name: string
  email: string
  department: string
}

export const columns: Array<ColumnDef<User>> = [
// add checkbox column for selection
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>,
  },
]
