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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  FileText, 
  FileImage, 
  FileType,
  File,
  Download,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: string;
  case: string;
  lastModified: string;
  owner: string;
};

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Contract Agreement v2.1.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2024-02-20",
    status: "Under Review",
    case: "Smith vs. Johnson Property Dispute",
    lastModified: "2024-02-21",
    owner: "Michael Chen"
  },
  {
    id: "2",
    name: "Property Deed Scan.jpg",
    type: "Image",
    size: "1.8 MB",
    uploadedAt: "2024-02-19",
    status: "Approved",
    case: "Tech Corp Merger Review",
    lastModified: "2024-02-20",
    owner: "Sarah Wilson"
  },
  {
    id: "3",
    name: "Employment Contract Template.docx",
    type: "DOCX",
    size: "856 KB",
    uploadedAt: "2024-02-18",
    status: "Draft",
    case: "Employment Contract Dispute",
    lastModified: "2024-02-19",
    owner: "Michael Chen"
  },
  {
    id: "4",
    name: "Case Evidence Bundle.zip",
    type: "ZIP",
    size: "15.2 MB",
    uploadedAt: "2024-02-17",
    status: "Archived",
    case: "Intellectual Property Claim",
    lastModified: "2024-02-18",
    owner: "Emma Thompson"
  },
  {
    id: "5",
    name: "Meeting Minutes.pdf",
    type: "PDF",
    size: "524 KB",
    uploadedAt: "2024-02-16",
    status: "Internal",
    case: "Contract Negotiation",
    lastModified: "2024-02-17",
    owner: "Michael Chen"
  }
];

export function DocumentsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { toast } = useToast();

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileType className="h-4 w-4 text-red-500" />;
      case "Image":
        return <FileImage className="h-4 w-4 text-blue-500" />;
      case "ZIP":
        return <File className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100";
      case "Under Review":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100";
      case "Draft":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100";
      case "Archived":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100";
      case "Internal":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-100";
    }
  };

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {getFileIcon(row.original.type)}
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.case}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "size",
      header: "Size",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={getStatusColor(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "owner",
      header: "Owner",
    },
    {
      accessorKey: "lastModified",
      header: "Last Modified",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
              toast({
                title: "Preview document",
                description: `Opening preview for ${row.original.name}`,
              });
            }}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast({
                title: "Downloading document",
                description: `Started download for ${row.original.name}`,
              });
            }}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast({
                title: "Edit document",
                description: `Opening editor for ${row.original.name}`,
              });
            }}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => {
              toast({
                variant: "destructive",
                title: "Delete document",
                description: "This action cannot be undone.",
              });
            }}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: mockDocuments,
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
        placeholder="Filter documents..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
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