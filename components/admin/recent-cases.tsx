import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentCases = [
  {
    id: "1",
    title: "Corporate Merger Review",
    assignee: "Sarah Wilson",
    status: "In Progress",
    priority: "High",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    initials: "SW",
  },
  {
    id: "2",
    title: "Property Acquisition",
    assignee: "Michael Chen",
    status: "Pending Review",
    priority: "Medium",
    avatarUrl: "https://i.pravatar.cc/150?u=michael",
    initials: "MC",
  },
  {
    id: "3",
    title: "Contract Dispute",
    assignee: "Emma Thompson",
    status: "Under Review",
    priority: "High",
    avatarUrl: "https://i.pravatar.cc/150?u=emma",
    initials: "ET",
  },
  {
    id: "4",
    title: "Intellectual Property Claim",
    assignee: "James Miller",
    status: "New",
    priority: "Medium",
    avatarUrl: "https://i.pravatar.cc/150?u=james",
    initials: "JM",
  },
  {
    id: "5",
    title: "Employment Agreement",
    assignee: "Lisa Anderson",
    status: "In Progress",
    priority: "Low",
    avatarUrl: "https://i.pravatar.cc/150?u=lisa",
    initials: "LA",
  },
];

export function RecentCases() {
  return (
    <div className="space-y-8">
      {recentCases.map((caseItem) => (
        <div key={caseItem.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={caseItem.avatarUrl} alt={caseItem.assignee} />
            <AvatarFallback>{caseItem.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{caseItem.title}</p>
            <p className="text-sm text-muted-foreground">
              {caseItem.assignee} · {caseItem.status}
            </p>
          </div>
          <div className={`ml-auto font-medium ${
            caseItem.priority === "High" 
              ? "text-red-500" 
              : caseItem.priority === "Medium" 
              ? "text-yellow-500" 
              : "text-green-500"
          }`}>
            {caseItem.priority}
          </div>
        </div>
      ))}
    </div>
  );
}