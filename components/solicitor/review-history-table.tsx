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
import { Badge } from "@/components/ui/badge";
import { FileText, Eye } from "lucide-react";

type Review = {
  id: string;
  documentName: string;
  caseTitle: string;
  reviewDate: string;
  status: string;
  comments: string;
  reviewedBy: string;
};

const mockReviews: Review[] = [
  {
    id: "1",
    documentName: "Contract Agreement v2.1.pdf",
    caseTitle: "Smith vs. Johnson Property Dispute",
    reviewDate: "2024-02-21",
    status: "Approved",
    comments: "All terms are in order. Ready for client signature.",
    reviewedBy: "Michael Chen",
  },
  {
    id: "2",
    documentName: "Property Deed Scan.jpg",
    caseTitle: "Tech Corp Merger Review",
    reviewDate: "2024-02-20",
    status: "Needs Revision",
    comments: "Please update section 3.2 with new property boundaries.",
    reviewedBy: "Sarah Wilson",
  },
  {
    id: "3",
    documentName: "Employment Contract Template.docx",
    caseTitle: "Employment Contract Dispute",
    reviewDate: "2024-02-19",
    status: "Approved",
    comments: "Template meets all current labor law requirements.",
    reviewedBy: "Emma Thompson",
  },
  {
    id: "4",
    documentName: "Legal Brief Draft.docx",
    caseTitle: "Intellectual Property Claim",
    reviewDate: "2024-02-18",
    status: "Pending",
    comments: "Awaiting additional case references.",
    reviewedBy: "Michael Chen",
  },
  {
    id: "5",
    documentName: "Settlement Agreement.pdf",
    caseTitle: "Contract Negotiation",
    reviewDate: "2024-02-17",
    status: "Rejected",
    comments: "Terms need significant revision. See detailed notes.",
    reviewedBy: "Sarah Wilson",
  },
];

export function ReviewHistoryTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100";
      case "Needs Revision":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100";
      case "Pending":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-100";
    }
  };

  const columns: ColumnDef<Review>[] = [
    {
      accessorKey: "documentName",
      header: "Document",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.original.documentName}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.caseTitle}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "reviewDate",
      header: "Review Date",
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
      accessorKey: "reviewedBy",
      header: "Reviewed By",
    },
    {
      accessorKey: "comments",
      header: "Comments",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate" title={row.getValue("comments")}>
          {row.getValue("comments")}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" title="View Details">
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: mockReviews,
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
        value={(table.getColumn("documentName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("documentName")?.setFilterValue(event.target.value)
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