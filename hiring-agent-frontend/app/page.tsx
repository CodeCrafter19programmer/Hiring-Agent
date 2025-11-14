"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, Cpu, GitPullRequest, UserCheck } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Total Jobs", value: "12", icon: Briefcase, color: "text-blue-600" },
    { name: "Active Agents", value: "8", icon: Cpu, color: "text-green-600" },
    { name: "Running Workflows", value: "3", icon: GitPullRequest, color: "text-yellow-600" },
    { name: "Candidates Today", value: "24", icon: UserCheck, color: "text-purple-600" },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1">
          <Topbar />
          <main className="mt-16 p-8">
            <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.name}
                      </CardTitle>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No recent activity</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button className="w-full rounded-md border p-3 text-left hover:bg-muted">Create New Job</button>
                  <button className="w-full rounded-md border p-3 text-left hover:bg-muted">Run Workflow</button>
                  <button className="w-full rounded-md border p-3 text-left hover:bg-muted">Upload CV</button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
