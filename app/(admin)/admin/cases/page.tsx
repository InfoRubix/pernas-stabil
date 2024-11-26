import { NewCaseDialog } from "@/components/admin/new-case-dialog";
import { CasesTable } from "@/components/admin/cases-table";

export default function CasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cases</h1>
        <NewCaseDialog />
      </div>
      <CasesTable />
    </div>
  );
}