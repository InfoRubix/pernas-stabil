"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const templates = [
  {
    id: "1",
    title: "Contract Agreement Template",
    description: "Standard contract agreement template with customizable clauses.",
    type: "DOCX",
    category: "Contracts",
  },
  {
    id: "2",
    title: "Legal Brief Template",
    description: "Professional legal brief format with proper citations structure.",
    type: "DOCX",
    category: "Legal Documents",
  },
  {
    id: "3",
    title: "Settlement Agreement",
    description: "Comprehensive settlement agreement template with standard terms.",
    type: "DOCX",
    category: "Agreements",
  },
  {
    id: "4",
    title: "Client Intake Form",
    description: "Detailed client information gathering form.",
    type: "PDF",
    category: "Forms",
  },
  {
    id: "5",
    title: "Case Summary Template",
    description: "Structured template for case analysis and summary.",
    type: "DOCX",
    category: "Case Management",
  },
];

export function DocumentTemplates() {
  const { toast } = useToast();

  const handleDownload = (template: typeof templates[0]) => {
    toast({
      title: "Template Downloaded",
      description: `${template.title} has been downloaded.`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{template.title}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {template.type}
              </span>
            </CardTitle>
            <CardDescription>{template.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              {template.description}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDownload(template)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}