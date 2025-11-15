"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="mt-16 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
