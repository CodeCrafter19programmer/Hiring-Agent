"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <h1 className="mb-4 text-2xl font-bold">Profile</h1>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Email:</span> {user?.email}</div>
              <div><span className="font-medium">Name:</span> {user?.full_name}</div>
              <div><span className="font-medium">Role:</span> {user?.role}</div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
