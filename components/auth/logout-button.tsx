"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would also clear auth tokens, session, etc.
    router.push("/login");
  };

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5 mr-2" />
      <span>Logout</span>
    </Button>
  );
}