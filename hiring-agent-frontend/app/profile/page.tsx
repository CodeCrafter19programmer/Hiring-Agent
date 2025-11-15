"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <AppLayout>
            <h1 className="mb-4 text-2xl font-bold">Profile</h1>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Email:</span> {user?.email}</div>
              <div><span className="font-medium">Name:</span> {user?.full_name}</div>
              <div><span className="font-medium">Role:</span> {user?.role}</div>
            </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
