import { FileText } from "lucide-react";

const recentDocuments = [
  {
    id: "1",
    title: "Merger Agreement Draft",
    type: "Contract",
    date: "2024-02-20",
    status: "Under Review",
  },
  {
    id: "2",
    title: "Property Deed",
    type: "Legal Document",
    date: "2024-02-19",
    status: "Approved",
  },
  {
    id: "3",
    title: "Employment Contract",
    type: "Contract",
    date: "2024-02-18",
    status: "Pending",
  },
  {
    id: "4",
    title: "NDA Template",
    type: "Template",
    date: "2024-02-17",
    status: "Approved",
  },
  {
    id: "5",
    title: "License Agreement",
    type: "Contract",
    date: "2024-02-16",
    status: "Under Review",
  },
];

export function RecentDocuments() {
  return (
    <div className="space-y-8">
      {recentDocuments.map((doc) => (
        <div key={doc.id} className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{doc.title}</p>
            <p className="text-sm text-muted-foreground">
              {doc.type} · {doc.date}
            </p>
          </div>
          <div className={`ml-auto text-sm font-medium ${
            doc.status === "Approved" 
              ? "text-green-500" 
              : doc.status === "Under Review" 
              ? "text-yellow-500" 
              : "text-blue-500"
          }`}>
            {doc.status}
          </div>
        </div>
      ))}
    </div>
  );
}