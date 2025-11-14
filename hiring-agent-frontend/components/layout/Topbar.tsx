"use client";

import { Bell, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/Button";

export function Topbar() {
  const { user } = useAuth();

  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b bg-card">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="relative rounded-md p-2 hover:bg-muted" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.full_name || user?.email}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => auth.logout()} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
