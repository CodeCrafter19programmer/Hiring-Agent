"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
            <h1 className="mb-4 text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure API URLs, integrations, and defaults here. Coming soon.</p>
      </AppLayout>
    </ProtectedRoute>
  );
}
