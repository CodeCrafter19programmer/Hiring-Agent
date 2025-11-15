"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Briefcase, Cpu, GitPullRequest, UserCheck, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Total Jobs", value: "12", icon: Briefcase, color: "text-blue-600" },
    { name: "Total Candidates", value: "156", icon: UserCheck, color: "text-purple-600" },
    { name: "Active Agents", value: "8", icon: Cpu, color: "text-green-600" },
    { name: "Active Workflows", value: "3", icon: GitPullRequest, color: "text-yellow-600" },
  ];

  // Mock data for recent candidates
  const recentCandidates = [
    { id: 1, name: "John Doe", job: "Senior Developer", score: 92, status: "Shortlisted" },
    { id: 2, name: "Jane Smith", job: "Product Manager", score: 88, status: "Pending Review" },
    { id: 3, name: "Mike Johnson", job: "UX Designer", score: 75, status: "Rejected" },
    { id: 4, name: "Sarah Williams", job: "Data Analyst", score: 95, status: "Shortlisted" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

        {/* Stats Cards */}
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

        {/* Charts Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Candidates per Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Senior Developer", "Product Manager", "UX Designer", "Data Analyst"].map((job, idx) => (
                  <div key={job} className="flex items-center justify-between">
                    <span className="text-sm">{job}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-32 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${[80, 65, 45, 90][idx]}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{[24, 18, 12, 32][idx]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">CV Screening</span>
                  <span className="font-medium">45 runs today</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Candidate Scoring</span>
                  <span className="font-medium">32 runs today</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Job Matching</span>
                  <span className="font-medium">28 runs today</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Last workflow run: 5 minutes ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Candidates Table */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Candidates</CardTitle>
                <Link href="/candidates">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-semibold">Name</th>
                      <th className="pb-3 font-semibold">Job</th>
                      <th className="pb-3 font-semibold">Score</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCandidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b border-border">
                        <td className="py-3">{candidate.name}</td>
                        <td className="py-3 text-muted-foreground">{candidate.job}</td>
                        <td className="py-3">
                          <span className="font-medium">{candidate.score}%</span>
                        </td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
