"use client";

import { useState } from "react";
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
import { MessageSquare } from "lucide-react";

interface CorrespondenceDialogProps {
  caseNumber: string;
  caseTitle: string;
}

export function CorrespondenceDialog({
  caseNumber,
  caseTitle,
}: CorrespondenceDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the PERNAS staff.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Staff
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact PERNAS Staff</DialogTitle>
          <DialogDescription>
            Regarding Case: {caseNumber} - {caseTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Subject"
              defaultValue={`Regarding Case ${caseNumber}`}
            />
            <Textarea
              placeholder="Type your message here..."
              className="min-h-[200px]"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Send Message</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}