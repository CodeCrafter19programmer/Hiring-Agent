"use client";

import { Bell, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/Button";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl lg:left-64">
      <div className="flex h-full items-center justify-between px-6">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <button className="relative rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.full_name || user?.email}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => auth.logout()} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => auth.logout()} title="Logout" className="sm:hidden">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
