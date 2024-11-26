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
import {
  MessageSquare,
  Search,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
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
  subject: string;
  date: string;
  status: string;
  preview: string;
  messages: Message[];
  caseNumber: string;
}

const correspondenceData: Correspondence[] = [
  {
    id: "1",
    subject: "Case Update - Smith vs. Johnson Property Dispute",
    date: "2024-02-21",
    status: "Active",
    preview: "Latest updates regarding property boundaries...",
    caseNumber: "CASE-2024-001",
    messages: [
      {
        id: "1-1",
        sender: "Michael Chen",
        content: "I've reviewed the updated property survey. There seems to be a discrepancy in the eastern boundary measurements.",
        timestamp: "2024-02-21 09:30",
        role: "solicitor",
      },
      {
        id: "1-2",
        sender: "Admin Staff",
        content: "Thank you for bringing this to our attention. I'll contact the surveyor to clarify the measurements.",
        timestamp: "2024-02-21 10:15",
        role: "staff",
      },
      {
        id: "1-3",
        sender: "Michael Chen",
        content: "Perfect, please let me know once you have more information. The client is eager to proceed.",
        timestamp: "2024-02-21 10:45",
        role: "solicitor",
      },
    ],
  },
  {
    id: "2",
    subject: "Document Review - Tech Corp Contract",
    date: "2024-02-20",
    status: "Pending",
    preview: "Requesting review of updated contract terms...",
    caseNumber: "CASE-2024-002",
    messages: [
      {
        id: "2-1",
        sender: "Michael Chen",
        content: "I've made the requested changes to sections 3 and 4 of the contract. Could you please review?",
        timestamp: "2024-02-20 14:20",
        role: "solicitor",
      },
      {
        id: "2-2",
        sender: "Admin Staff",
        content: "I'll review the changes and get back to you by tomorrow morning.",
        timestamp: "2024-02-20 14:45",
        role: "staff",
      },
    ],
  },
  {
    id: "3",
    subject: "Client Meeting Schedule - Johnson Family Trust",
    date: "2024-02-19",
    status: "Closed",
    preview: "Coordination for upcoming client meeting...",
    caseNumber: "CASE-2024-003",
    messages: [
      {
        id: "3-1",
        sender: "Michael Chen",
        content: "The Johnson family would like to schedule a meeting next week to discuss the trust arrangements.",
        timestamp: "2024-02-19 11:00",
        role: "solicitor",
      },
      {
        id: "3-2",
        sender: "Admin Staff",
        content: "I can arrange the meeting room for Tuesday at 2 PM. Would that work?",
        timestamp: "2024-02-19 11:30",
        role: "staff",
      },
      {
        id: "3-3",
        sender: "Michael Chen",
        content: "Yes, that works perfectly. Please send the calendar invites.",
        timestamp: "2024-02-19 11:45",
        role: "solicitor",
      },
    ],
  },
];

export function SolicitorCorrespondence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const { toast } = useToast();

  const handleNewMessage = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the PERNAS staff.",
    });
  };

  const handleReply = (correspondenceId: string) => {
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
    });
  };

  const filteredCorrespondence = correspondenceData.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search correspondence..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>
                Send a new message to PERNAS staff
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input placeholder="Case Number" />
                <Input placeholder="Subject" />
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNewMessage}>Send Message</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                      Case: {item.caseNumber} · {item.date}
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
                      <DialogTitle>Reply to Thread</DialogTitle>
                      <DialogDescription>
                        Re: {item.subject}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
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
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
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
                          ? "bg-primary/5"
                          : "bg-muted"
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