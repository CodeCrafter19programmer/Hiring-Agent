"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Briefcase, Cpu, GitPullRequest, UserCheck, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Grid },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Agents", href: "/agents", icon: Cpu },
  { name: "Workflows", href: "/workflows", icon: GitPullRequest },
  { name: "Candidates", href: "/candidates", icon: UserCheck },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Hiring Agent</h1>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
