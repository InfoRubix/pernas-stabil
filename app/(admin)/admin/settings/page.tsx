import { Separator } from "@/components/ui/separator";
import { AdminSettingsForm } from "@/components/admin/settings-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your system preferences and configurations.
        </p>
      </div>
      <Separator />
      <AdminSettingsForm />
    </div>
  );
}