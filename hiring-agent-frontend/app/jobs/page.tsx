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
                    <th className="px-4 py-3 text-left text-sm font-semibold">Job Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Department</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Candidates</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {data?.data?.map((job) => (
                    <tr key={job.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{job.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{job.department || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {job.candidates_count || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-1 text-xs capitalize ${
                          job.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{formatDate(job.created_at)}</td>
                      <td className="px-4 py-3">
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
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
