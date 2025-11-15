"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCreateJob } from "@/hooks/useJobs";

export default function NewJobPage() {
  const router = useRouter();
  const createJob = useCreateJob();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob.mutateAsync({ title, description });
    router.push("/jobs");
  };

  return (
    <ProtectedRoute>
      <AppLayout>
            <h1 className="mb-6 text-2xl font-bold">Create Job</h1>
            <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
              <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <div>
                <label className="mb-1.5 block text-sm font-medium">Description</label>
                <textarea
                  className="h-32 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button type="submit" isLoading={createJob.isPending}>Create</Button>
            </form>
      </AppLayout>
    </ProtectedRoute>
  );
}
