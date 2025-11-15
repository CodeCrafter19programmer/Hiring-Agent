"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useWorkflowLogs, useTriggerWorkflow } from "@/hooks/useWorkflows";
import Link from "next/link";
import { useState } from "react";

export default function WorkflowsPage() {
  const { data, isLoading, error } = useWorkflowLogs();
  const trigger = useTriggerWorkflow();

  const [jobId, setJobId] = useState("");
  const [agentIds, setAgentIds] = useState("");

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    const ids = agentIds.split(",").map((s) => s.trim()).filter(Boolean);
    await trigger.mutateAsync({ job_id: jobId, agent_ids: ids });
  };

  return (
    <ProtectedRoute>
      <AppLayout>
            <h1 className="mb-6 text-2xl font-bold">Workflows</h1>

            <form onSubmit={handleTrigger} className="mb-8 grid max-w-2xl gap-3 md:grid-cols-3">
              <input
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              />
              <input
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Agent IDs (comma-separated)"
                value={agentIds}
                onChange={(e) => setAgentIds(e.target.value)}
              />
              <Button type="submit" isLoading={trigger.isPending}>Trigger</Button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-600">Failed to load workflow logs</p>}

            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Job</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {data?.data?.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3">{log.id}</td>
                      <td className="px-4 py-3">{log.job_id}</td>
                      <td className="px-4 py-3 capitalize">{log.status}</td>
                      <td className="px-4 py-3">
                        <Link href={`/workflows/logs/${log.id}`} className="text-primary hover:underline">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
