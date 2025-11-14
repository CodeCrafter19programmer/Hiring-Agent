"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCreateAgent } from "@/hooks/useAgents";

export default function NewAgentPage() {
  const router = useRouter();
  const createAgent = useCreateAgent();
  const [name, setName] = useState("");
  const [type, setType] = useState("screening");
  const [config, setConfig] = useState("{\n  \"model\": \"gpt-4\"\n}");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let parsed: any = {};
    try {
      parsed = JSON.parse(config || "{}");
    } catch (e) {
      alert("Invalid JSON config");
      return;
    }
    await createAgent.mutateAsync({ name, type, config: parsed });
    router.push("/agents");
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <h1 className="mb-6 text-2xl font-bold">Create Agent</h1>
            <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <div>
                <label htmlFor="type" className="mb-1.5 block text-sm font-medium">Type</label>
                <select
                  id="type"
                  title="Type"
                  className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="screening">Screening</option>
                  <option value="analysis">Analysis</option>
                  <option value="notification">Notification</option>
                </select>
              </div>
              <div>
                <label htmlFor="config" className="mb-1.5 block text-sm font-medium">Config (JSON)</label>
                <textarea
                  id="config"
                  title="Config JSON"
                  className="h-40 w-full rounded-md border p-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 focus:ring-offset-2"
                  value={config}
                  onChange={(e) => setConfig(e.target.value)}
                />
              </div>
              <Button type="submit" isLoading={createAgent.isPending}>Create</Button>
            </form>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
