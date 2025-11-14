"use client";

import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useAgents } from "@/hooks/useAgents";
import { formatDate } from "@/lib/utils";

export default function AgentsPage() {
  const { data, isLoading, error } = useAgents();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Agents</h1>
              <Link href="/agents/new">
                <Button>New Agent</Button>
              </Link>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-600">Failed to load agents</p>}

            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {data?.data?.map((agent) => (
                    <tr key={agent.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <Link href={`/agents/${agent.id}`} className="text-primary hover:underline">
                          {agent.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 capitalize">{agent.type}</td>
                      <td className="px-4 py-3">{formatDate(agent.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
