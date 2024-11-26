import { UsersTable } from "@/components/admin/users-table";
import { NewUserDialog } from "@/components/admin/new-user-dialog";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <NewUserDialog />
      </div>
      <UsersTable />
    </div>
  );
}