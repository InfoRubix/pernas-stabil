import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaffPerformance } from "@/components/admin/staff-performance";
import { SolicitorAnalytics } from "@/components/admin/solicitor-analytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          <TabsTrigger value="solicitors">Solicitor Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <StaffPerformance />
        </TabsContent>
        <TabsContent value="solicitors">
          <SolicitorAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}