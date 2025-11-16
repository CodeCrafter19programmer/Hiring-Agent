"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, Users, Briefcase, FileText, TrendingUp, Play } from "lucide-react";
import { candidatesService, type Candidate } from "@/lib/services/candidates";
import { screeningService } from "@/lib/services/screening";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newCVsDetected: 0,
    screenedThisWeek: 0,
    jobsOpen: 0,
    recruitersActive: 3
  });
  
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState("");

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get candidate stats
      const statsResponse = await candidatesService.getCandidateStats();
      setStats({
        newCVsDetected: 5, // This would come from Gmail API in real implementation
        screenedThisWeek: statsResponse.data.screenedThisWeek,
        jobsOpen: statsResponse.data.jobsOpen,
        recruitersActive: 3 // This would come from Supabase user count
      });

      // Get recent candidates
      const candidatesResponse = await candidatesService.getCandidates();
      setRecentCandidates(candidatesResponse.data.slice(0, 10)); // Last 10 candidates
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleProcessNewCVs = async () => {
    setIsProcessing(true);
    setProcessingResult("");

    try {
      const result = await screeningService.triggerScreening();
      
      if (result.data.success) {
        setProcessingResult("✅ CV screening workflow triggered successfully! Check the candidates page for results.");
        // Refresh data after processing
        setTimeout(loadDashboardData, 2000);
      } else {
        setProcessingResult(`❌ Failed to trigger workflow: ${result.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setProcessingResult(`❌ Error: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const statCards = [
    { 
      name: "New CVs Detected in Gmail", 
      value: stats.newCVsDetected.toString(), 
      icon: Mail, 
      color: "text-blue-600" 
    },
    { 
      name: "Total Screened This Week", 
      value: stats.screenedThisWeek.toString(), 
      icon: FileText, 
      color: "text-green-600" 
    },
    { 
      name: "Jobs Open", 
      value: stats.jobsOpen.toString(), 
      icon: Briefcase, 
      color: "text-orange-600" 
    },
    { 
      name: "Recruiters Active", 
      value: stats.recruitersActive.toString(), 
      icon: Users, 
      color: "text-purple-600" 
    },
  ];

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">High-level control & insights for CV screening automation</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
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

          {/* Primary Action Button */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-600" />
                CV Processing Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Trigger the n8n workflow to process new CVs from Gmail and screen candidates against job requirements.
              </p>
              <Button 
                onClick={handleProcessNewCVs} 
                disabled={isProcessing}
                size="lg"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4 animate-spin" />
                    Processing CVs...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    PROCESS NEW CVs
                  </>
                )}
              </Button>
              {processingResult && (
                <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800 text-sm">
                  {processingResult}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Screened Candidates */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Screened Candidates</CardTitle>
                <Link href="/candidates">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentCandidates.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold">Job Role</th>
                        <th className="pb-3 font-semibold">Fit Score</th>
                        <th className="pb-3 font-semibold">Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCandidates.map((candidate) => (
                        <tr key={candidate.id} className="border-b border-border">
                          <td className="py-3">{candidate.name}</td>
                          <td className="py-3 text-muted-foreground">{candidate.jobRole}</td>
                          <td className="py-3">
                            <span className={`font-bold ${getFitScoreColor(candidate.fitScore)}`}>
                              {candidate.fitScore}%
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-sm text-muted-foreground">
                              {candidate.extractedSkills.split(',').slice(0, 3).join(', ')}
                              {candidate.extractedSkills.split(',').length > 3 && '...'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No candidates screened yet. Click "PROCESS NEW CVs" to start screening.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
