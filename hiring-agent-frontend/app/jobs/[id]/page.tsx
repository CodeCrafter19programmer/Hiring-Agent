"use client";

import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useJob, useUpdateJob, type Job } from "@/hooks/useJobs";
import { useState, useEffect } from "react";

export default function JobDetailPage() {
  const params = useParams();
  const id = String(params?.id);
  const router = useRouter();

  const { data, isLoading } = useJob(id);
  const updateJob = useUpdateJob(id);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Job["status"]>("open");

  useEffect(() => {
    if (data?.data) {
      setTitle(data.data.title);
      setStatus(data.data.status);
    }
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateJob.mutateAsync({ title, status });
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Job Detail</h1>
                  <Button variant="secondary" onClick={() => router.push("/jobs")}>Back</Button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                  <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Status</label>
                    <select
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as Job["status"])}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <Button type="submit" isLoading={updateJob.isPending}>Save</Button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
