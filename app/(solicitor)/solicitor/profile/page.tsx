import { SolicitorProfile } from "@/components/solicitor/profile";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>
      <Separator />
      <SolicitorProfile />
    </div>
  );
}