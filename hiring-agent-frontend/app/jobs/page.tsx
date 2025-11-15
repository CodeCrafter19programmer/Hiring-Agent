"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useJobs } from "@/hooks/useJobs";
import { formatDate } from "@/lib/utils";

export default function JobsPage() {
  const { data, isLoading, error } = useJobs();

  return (
    <ProtectedRoute>
      <AppLayout>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Jobs</h1>
              <Link href="/jobs/new">
                <Button>New Job</Button>
              </Link>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-600">Failed to load jobs</p>}

            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {data?.data?.map((job) => (
                    <tr key={job.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <Link href={`/jobs/${job.id}`} className="text-primary hover:underline">
                          {job.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 capitalize">{job.status}</td>
                      <td className="px-4 py-3">{formatDate(job.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
