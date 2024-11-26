"use client";

import { SolicitorCasesTable } from "@/components/solicitor/cases-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentTemplates } from "@/components/solicitor/document-templates";

export default function SolicitorCasesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Cases</h1>
      
      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Active Cases</TabsTrigger>
          <TabsTrigger value="templates">Document Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="cases">
          <SolicitorCasesTable />
        </TabsContent>
        <TabsContent value="templates">
          <DocumentTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}