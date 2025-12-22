"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  entityType?: "teacher" | "student" | "staff" | "classroom" | "subject" | "batch" | "department" | "feeSetting" | "dueFee" | "transaction";
  onRemove?: (id: string) => Promise<void> | void;
  onMakePayment?: (id: string) => void;
  showActions?: {
    add?: boolean;
    view?: boolean;
    edit?: boolean;
    remove?: boolean;
    makePayment?: boolean;
  };
  filterContent?: {
    available: boolean;
    data: string;
    title: string;
    fieldsList: { label: string; placeholder: string; type: string, apiEndpoint?: string }[];
    apiEndpoint: string;
  };
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  filterColumn = "name",
  entityType = "teacher", // default to 'teacher' for backward compatibility
  onRemove,
  onMakePayment,
  showActions = {
    add: true,
    view: true,
    edit: true,
    remove: true,
    makePayment: false
  },
  filterContent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      {/* 🔍 Search Input */}
      <div className="flex items-center py-4 gap-2 sticky top-0 bg-white z-10">

        <Input
          placeholder={`Filter ${filterColumn}...`}
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Filter Button */}
        {filterContent?.available ? <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger className="cursor-pointer bg-[#151529]! hover:bg-gray-200! p-2.5 text-white hover:text-[#2a2a2a] rounded-md"> <Filter className="h-4 w-4" /></DialogTrigger>
          <DialogContent className="max-w-[600px]!">
            <DialogHeader>
              <DialogTitle className="text-[26px]">{filterContent.data} Filter</DialogTitle>
            </DialogHeader>
            <div>
              <div className="grid grid-cols-12 gap-5">
                {filterContent.fieldsList.map((field, index) => (
                  <div key={index} className="col-span-6 max-md:col-span-full">

                    <label className="block mb-1 font-medium">{field.label}</label>
                    {field.type === "input" ? (
                      <Input className="h-10" placeholder={field.placeholder} />
                    ) : field.type === "select" ? (
                      <div className="px-2! border border-gray-300 rounded-md h-10">
                        <select className="w-full bg-transparent! outline-none! py-auto! px-0! h-10">
                          <option value="">{field.placeholder}</option>
                          {/* Add options here */}
                        </select>
                      </div>
                    ) : null}
                  </div>
                ))}

              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterDialogOpen(false)}
                  className="mt-4 cursor-pointer"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsFilterDialogOpen(false)}
                  className="mt-4 bg-[#151529] hover:bg-black text-white! cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog> : null}

        {/* Columns Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Add New Entity Button */}
        {showActions.add !== false && (
          <Button
            variant="outline"
            className="capitalize bg-[#151529] text-white cursor-pointer"
            onClick={() =>
              navigate(
                `/${entityType === "classroom" ? "classrooms" : `${entityType}s`
                }/add-${entityType}${entityType === "classroom" ? "" : "s"}`
              )
            }
          >
            Add {entityType}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Select All Checkbox */}
                <TableHead className="w-12">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                </TableHead>

                {/* Dynamic Headers */}
                {headerGroup.headers
                  .filter(
                    (header) =>
                      header.id !== "select" &&
                      header.id !== "actions" &&
                      header.column.getIsVisible()
                  )
                  .map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}

                {/* Actions Header - Always visible */}
                {/* <TableHead className="w-12">
                  Actions
                </TableHead> */}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* Select Checkbox */}
                  <TableCell>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </TableCell>

                  {/* Dynamic Cells - Only show visible columns */}
                  {row
                    .getVisibleCells()
                    .filter(
                      (cell) =>
                        cell.column.id !== "select" &&
                        cell.column.id !== "actions" &&
                        cell.column.getIsVisible()
                    )
                    .map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}

                  {/* Actions Cell - Conditionally visible */}
                  {(showActions.view || showActions.edit || showActions.remove || showActions.makePayment) && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {showActions.view !== false && (
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(
                                  `/${entityType === "classroom"
                                    ? "classrooms"
                                    : `${entityType}s`
                                  }/view-${entityType}${entityType === "classroom" ? "" : "s"
                                  }/${row.original.id}`
                                )
                              }
                            >
                              View details
                            </DropdownMenuItem>
                          )}
                          {showActions.edit !== false && (
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(
                                  `/${entityType === "classroom"
                                    ? "classrooms"
                                    : `${entityType}s`
                                  }/edit-${entityType}${entityType === "classroom" ? "" : "s"
                                  }/${row.original.id}`
                                )
                              }
                            >
                              Edit {entityType}
                            </DropdownMenuItem>
                          )}
                          {showActions.remove !== false && onRemove && (
                            <DropdownMenuItem
                              className="text-red-600 hover:text-white! hover:bg-[#151529]!"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (
                                  window.confirm(
                                    `Are you sure you want to remove this ${entityType}?`
                                  )
                                ) {
                                  try {
                                    await onRemove(row.original.id);
                                  } catch (error) {
                                    console.error(`Error removing ${entityType}:`, error);
                                  }
                                }
                              }}
                            >
                              Remove {entityType}
                            </DropdownMenuItem>
                          )}
                          {showActions.makePayment !== false && onMakePayment && (
                            <DropdownMenuItem
                              className="text-green-600 hover:text-white! hover:bg-green-600!"
                              onClick={(e) => {
                                e.stopPropagation();
                                onMakePayment(row.original.id);
                              }}
                            >
                              Make Payment
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          size="sm"
          variant="outline"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
