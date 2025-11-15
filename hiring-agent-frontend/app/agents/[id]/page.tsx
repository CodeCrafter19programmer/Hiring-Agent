"use client";

import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAgent, useUpdateAgent } from "@/hooks/useAgents";
import { useState, useEffect } from "react";

export default function AgentDetailPage() {
  const params = useParams();
  const id = String(params?.id);
  const router = useRouter();

  const { data, isLoading } = useAgent(id);
  const updateAgent = useUpdateAgent(id);

  const [name, setName] = useState("");
  const [type, setType] = useState("screening");
  const [config, setConfig] = useState("{}");

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setType(data.data.type);
      setConfig(JSON.stringify(data.data.config ?? {}, null, 2));
    }
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let parsed: any = {};
    try {
      parsed = JSON.parse(config || "{}");
    } catch (e) {
      alert("Invalid JSON config");
      return;
    }
    await updateAgent.mutateAsync({ name, type, config: parsed });
  };

  return (
    <ProtectedRoute>
      <AppLayout>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Agent Detail</h1>
                  <Button variant="secondary" onClick={() => router.push("/agents")}>Back</Button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                  <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Type</label>
                    <select
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="screening">Screening</option>
                      <option value="analysis">Analysis</option>
                      <option value="notification">Notification</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Config (JSON)</label>
                    <textarea
                      className="h-40 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      value={config}
                      onChange={(e) => setConfig(e.target.value)}
                    />
                  </div>
                  <Button type="submit" isLoading={updateAgent.isPending}>Save</Button>
                </form>
              </div>
            )}
      </AppLayout>
    </ProtectedRoute>
  );
}
