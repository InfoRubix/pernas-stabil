"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type Case = {
  id: string;
  title: string;
  assignee: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  status: string;
  priority: string;
  dueDate: string;
  type: string;
};

const data: Case[] = [
  {
    id: "1",
    title: "Corporate Merger Review",
    assignee: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    },
    status: "In Progress",
    priority: "High",
    dueDate: "2024-03-15",
    type: "Merger & Acquisition",
  },
  {
    id: "2",
    title: "Property Acquisition",
    assignee: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatarUrl: "https://i.pravatar.cc/150?u=michael",
    },
    status: "Pending Review",
    priority: "Medium",
    dueDate: "2024-03-20",
    type: "Real Estate",
  },
  {
    id: "3",
    title: "Contract Dispute",
    assignee: {
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      avatarUrl: "https://i.pravatar.cc/150?u=emma",
    },
    status: "Under Review",
    priority: "High",
    dueDate: "2024-03-10",
    type: "Litigation",
  },
];

export function CasesTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Case>[] = [
    {
      accessorKey: "title",
      header: "Case",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-muted-foreground">{row.original.type}</div>
        </div>
      ),
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => {
        const assignee = row.original.assignee;
        return (
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
              <AvatarFallback>{assignee.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{assignee.name}</div>
              <div className="text-sm text-muted-foreground">{assignee.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const getStatusColor = (status: string) => {
          switch (status) {
            case "In Progress":
              return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100";
            case "Pending Review":
              return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100";
            case "Under Review":
              return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100";
            default:
              return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100";
          }
        };

        return (
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.original.priority;
        const getPriorityColor = (priority: string) => {
          switch (priority) {
            case "High":
              return "text-red-600";
            case "Medium":
              return "text-yellow-600";
            case "Low":
              return "text-green-600";
            default:
              return "text-gray-600";
          }
        };

        return (
          <div className={`font-medium ${getPriorityColor(priority)}`}>
            {priority}
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit case</DropdownMenuItem>
              <DropdownMenuItem>Assign reviewer</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Close case
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter cases..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
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
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}