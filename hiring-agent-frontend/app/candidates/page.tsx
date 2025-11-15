"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

export default function CandidatesPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
            <h1 className="mb-4 text-2xl font-bold">Candidates</h1>
            <p className="text-muted-foreground">This module will list candidates and their AI evaluations. Coming soon.</p>
      </AppLayout>
    </ProtectedRoute>
  );
}
