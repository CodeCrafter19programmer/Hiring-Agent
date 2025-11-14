"use client";

import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useWorkflowLog } from "@/hooks/useWorkflows";

export default function WorkflowLogDetailPage() {
  const params = useParams();
  const id = String(params?.id);
  const router = useRouter();

  const { data, isLoading } = useWorkflowLog(id);
  const log = data?.data;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Workflow Log #{id}</h1>
              <Button variant="secondary" onClick={() => router.push("/workflows")}>Back</Button>
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : log ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Details</h2>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Job:</span> {log.job_id}</div>
                    <div><span className="font-medium">Agent:</span> {log.agent_id}</div>
                    <div><span className="font-medium">Status:</span> {log.status}</div>
                    <div><span className="font-medium">Created:</span> {new Date(log.created_at).toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Input</h2>
                  <pre className="overflow-auto rounded-md border bg-muted p-3 text-xs">{JSON.stringify(log.input_payload, null, 2)}</pre>
                </div>
                <div className="md:col-span-2">
                  <h2 className="mb-2 text-lg font-semibold">Output</h2>
                  <pre className="overflow-auto rounded-md border bg-muted p-3 text-xs">{JSON.stringify(log.output_payload, null, 2)}</pre>
                </div>
              </div>
            ) : (
              <p>Not found.</p>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
