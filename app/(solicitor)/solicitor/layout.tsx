"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Clock,
  UserCircle,
  Settings,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/auth/logout-button";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/solicitor",
    icon: LayoutDashboard,
  },
  {
    title: "My Cases",
    href: "/solicitor/cases",
    icon: FileText,
  },
  {
    title: "Correspondence",
    href: "/solicitor/correspondence",
    icon: MessageSquare,
  },
  {
    title: "Review History",
    href: "/solicitor/history",
    icon: Clock,
  },
  {
    title: "Profile",
    href: "/solicitor/profile",
    icon: UserCircle,
  },
  {
    title: "Settings",
    href: "/solicitor/settings",
    icon: Settings,
  },
];

export default function SolicitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-background transition-transform duration-200 ease-in-out",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-bold">PERNAS Solicitor</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <ThemeToggle />
          <LogoutButton className="w-full justify-start" />
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "min-h-screen transition-margin duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : ""
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className={cn("lg:hidden", isSidebarOpen && "hidden")}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}