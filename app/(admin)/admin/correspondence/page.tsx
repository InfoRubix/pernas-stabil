import { CorrespondenceList } from "@/components/admin/correspondence-list";

export default function CorrespondencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Correspondence</h1>
      <CorrespondenceList />
    </div>
  );
}