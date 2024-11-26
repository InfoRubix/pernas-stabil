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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CorrespondenceDialog } from "./correspondence-dialog";

type Case = {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  status: string;
  priority: string;
  dueDate: string;
  type: string;
  documents: number;
};

const data: Case[] = [
  {
    id: "1",
    caseNumber: "CASE-2024-001",
    title: "Smith vs. Johnson Property Dispute",
    client: "John Smith",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-03-15",
    type: "Property Law",
    documents: 12,
  },
  {
    id: "2",
    caseNumber: "CASE-2024-002",
    title: "Tech Corp Merger Review",
    client: "Tech Corp Inc.",
    status: "Under Review",
    priority: "Medium",
    dueDate: "2024-03-20",
    type: "Corporate Law",
    documents: 8,
  },
  {
    id: "3",
    caseNumber: "CASE-2024-003",
    title: "Employment Contract Dispute",
    client: "Sarah Williams",
    status: "Pending",
    priority: "High",
    dueDate: "2024-03-10",
    type: "Employment Law",
    documents: 5,
  },
];

export function SolicitorCasesTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { toast } = useToast();

  const handleFileUpload = (caseId: string) => {
    toast({
      title: "File uploaded",
      description: "Your document has been uploaded successfully.",
    });
  };

  const columns: ColumnDef<Case>[] = [
    {
      accessorKey: "caseNumber",
      header: "Case Number",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-muted-foreground">{row.original.type}</div>
        </div>
      ),
    },
    {
      accessorKey: "client",
      header: "Client",
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
            case "Under Review":
              return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100";
            case "Pending":
              return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100";
            default:
              return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100";
          }
        };

        return (
          <Badge variant="outline" className={getStatusColor(status)}>
            {status}
          </Badge>
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
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{row.original.documents}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a document for case {row.original.caseNumber}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                    id="file"
                    type="file"
                    onChange={() => handleFileUpload(row.original.id)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <CorrespondenceDialog
            caseNumber={row.original.caseNumber}
            caseTitle={row.original.title}
          />
        </div>
      ),
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