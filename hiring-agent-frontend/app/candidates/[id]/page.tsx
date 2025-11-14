"use client";

import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";

export default function CandidateDetailPage() {
  const params = useParams();
  const id = String(params?.id);
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Candidate #{id}</h1>
              <Button variant="secondary" onClick={() => router.push("/candidates")}>Back</Button>
            </div>
            <p className="text-muted-foreground">Detailed candidate profile and AI scoring will appear here. Coming soon.</p>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
