"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Briefcase, Cpu, GitPullRequest, UserCheck, Settings, User, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Grid },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Agents", href: "/agents", icon: Cpu },
    { name: "Workflows", href: "/workflows", icon: GitPullRequest },
    { name: "Candidates", href: "/candidates", icon: UserCheck },
    ...(user?.role === "Admin" ? [{ name: "Users", href: "/users", icon: Users }] : []),
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <h1 className="text-xl font-bold">Hiring Agent</h1>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
