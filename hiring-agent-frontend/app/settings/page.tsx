"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <h1 className="mb-4 text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure API URLs, integrations, and defaults here. Coming soon.</p>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
