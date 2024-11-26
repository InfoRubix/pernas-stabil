"use client";

import { DocumentsTable } from "@/components/solicitor/documents-table";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function DocumentsPage() {
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Upload document",
      description: "Document upload functionality will be implemented soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      <DocumentsTable />
    </div>
  );
}