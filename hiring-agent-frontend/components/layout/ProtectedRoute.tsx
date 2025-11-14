"use client";

import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "../ui/Spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth(true);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
