"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  role: "solicitor" | "staff";
}

interface Correspondence {
  id: string;
  solicitor: string;
  subject: string;
  date: string;
  status: string;
  preview: string;
  messages: Message[];
}

const correspondenceData: Correspondence[] = [
  {
    id: "1",
    solicitor: "Sarah Wilson",
    subject: "Case Update Request - Smith vs. Johnson",
    date: "2024-02-21",
    status: "Pending",
    preview: "Requesting update on the current status of property dispute case...",
    messages: [
      {
        id: "1-1",
        sender: "Sarah Wilson",
        content: "Could you please provide an update on the Smith vs. Johnson property dispute case? The client has been asking about the current status.",
        timestamp: "2024-02-21 09:30",
        role: "solicitor",
      },
      {
        id: "1-2",
        sender: "Admin Staff",
        content: "I've reviewed the case files. The property survey report was received yesterday, and we're waiting for the final assessment from the property evaluator.",
        timestamp: "2024-02-21 10:15",
        role: "staff",
      },
      {
        id: "1-3",
        sender: "Sarah Wilson",
        content: "Thank you for the quick response. When do you expect to receive the final assessment?",
        timestamp: "2024-02-21 10:45",
        role: "solicitor",
      },
      {
        id: "1-4",
        sender: "Admin Staff",
        content: "The evaluator has promised to deliver it by the end of this week. I'll notify you as soon as it arrives.",
        timestamp: "2024-02-21 11:00",
        role: "staff",
      },
    ],
  },
  {
    id: "2",
    solicitor: "Michael Chen",
    subject: "Document Review Required - Tech Corp Merger",
    date: "2024-02-20",
    status: "Responded",
    preview: "Need assistance with reviewing the merger agreement draft...",
    messages: [
      {
        id: "2-1",
        sender: "Michael Chen",
        content: "I've uploaded the latest merger agreement draft for Tech Corp. Could you please review the compliance sections?",
        timestamp: "2024-02-20 14:20",
        role: "solicitor",
      },
      {
        id: "2-2",
        sender: "Admin Staff",
        content: "I'll start reviewing it right away. Are there any specific areas you want me to focus on?",
        timestamp: "2024-02-20 14:45",
        role: "staff",
      },
      {
        id: "2-3",
        sender: "Michael Chen",
        content: "Yes, please pay special attention to sections 7.2 and 8.1 regarding regulatory compliance and data protection measures.",
        timestamp: "2024-02-20 15:00",
        role: "solicitor",
      },
      {
        id: "2-4",
        sender: "Admin Staff",
        content: "I've reviewed those sections. There are a few points that need clarification. I'll prepare a detailed report and send it to you by EOD.",
        timestamp: "2024-02-20 16:30",
        role: "staff",
      },
    ],
  },
  {
    id: "3",
    solicitor: "Emma Thompson",
    subject: "Clarification on Case Assignment",
    date: "2024-02-19",
    status: "Pending",
    preview: "Seeking clarification regarding the new case assignment process...",
    messages: [
      {
        id: "3-1",
        sender: "Emma Thompson",
        content: "I noticed some changes in the case assignment process. Could you explain the new workflow?",
        timestamp: "2024-02-19 11:00",
        role: "solicitor",
      },
      {
        id: "3-2",
        sender: "Admin Staff",
        content: "The new process requires all case assignments to go through the central system first. This helps us better track workload distribution.",
        timestamp: "2024-02-19 11:30",
        role: "staff",
      },
      {
        id: "3-3",
        sender: "Emma Thompson",
        content: "I see. How does this affect the urgent case assignments?",
        timestamp: "2024-02-19 11:45",
        role: "solicitor",
      },
      {
        id: "3-4",
        sender: "Admin Staff",
        content: "Urgent cases will be flagged in the system and automatically prioritized. You'll receive immediate notifications for these.",
        timestamp: "2024-02-19 12:00",
        role: "staff",
      },
    ],
  },
];

export function CorrespondenceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const { toast } = useToast();

  const handleReply = (correspondenceId: string) => {
    toast({
      title: "Reply sent",
      description: "Your response has been sent to the solicitor.",
    });
  };

  const filteredCorrespondence = correspondenceData.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solicitor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search correspondence..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredCorrespondence.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setExpandedThread(expandedThread === item.id ? null : item.id)}
                  >
                    {expandedThread === item.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <CardTitle className="text-lg">{item.subject}</CardTitle>
                    <CardDescription>
                      From: {item.solicitor} · {item.date}
                    </CardDescription>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reply to Correspondence</DialogTitle>
                      <DialogDescription>
                        Responding to: {item.subject}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Input
                          placeholder="Subject"
                          defaultValue={`Re: ${item.subject}`}
                        />
                        <Textarea
                          placeholder="Type your reply here..."
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => handleReply(item.id)}>Send Reply</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">{item.preview}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div
                  className={cn(
                    "space-y-4 overflow-hidden transition-all",
                    expandedThread === item.id ? "block" : "hidden"
                  )}
                >
                  {item.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 rounded-lg p-4",
                        message.role === "solicitor"
                          ? "bg-muted"
                          : "bg-primary/5"
                      )}
                    >
                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-sm text-muted-foreground">
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}