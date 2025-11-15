"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Users, Search, Eye, Filter } from "lucide-react";
import { candidatesService, Candidate } from "@/lib/services/candidates";
import { jobsService, Job } from "@/lib/services/jobs";

export default function ScreenedCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJob, setFilterJob] = useState("all");
  const [filterMinScore, setFilterMinScore] = useState("");
  const [filterSkills, setFilterSkills] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [candidates, searchQuery, filterJob, filterMinScore, filterSkills]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [candidatesResponse, jobsResponse] = await Promise.all([
        candidatesService.getCandidates(),
        jobsService.getJobs()
      ]);
      
      setCandidates(candidatesResponse.data);
      setJobs(jobsResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = candidates;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.extractedSkills.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Job role filter
    if (filterJob && filterJob !== 'all') {
      filtered = filtered.filter(candidate =>
        candidate.jobRole.toLowerCase().includes(filterJob.toLowerCase())
      );
    }

    // Minimum fit score filter
    if (filterMinScore) {
      const minScore = parseInt(filterMinScore);
      filtered = filtered.filter(candidate => candidate.fitScore >= minScore);
    }

    // Skills filter
    if (filterSkills) {
      filtered = filtered.filter(candidate =>
        candidate.extractedSkills.toLowerCase().includes(filterSkills.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailsModal(true);
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AppLayout>
          <div className="flex items-center justify-center min-h-64">
            <div className="text-lg">Loading screened candidates...</div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Screened Candidates</h1>
              <p className="text-muted-foreground">View all processed applicants from Gmail CV screening</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Input
                  label="Search"
                  placeholder="Name, email, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-4 w-4" />}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Job Role</label>
                  <select
                    value={filterJob}
                    onChange={(e) => setFilterJob(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Roles</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Fit Score >"
                  placeholder="e.g., 80"
                  type="number"
                  value={filterMinScore}
                  onChange={(e) => setFilterMinScore(e.target.value)}
                />
                <Input
                  label="Skills"
                  placeholder="e.g., React, Node.js"
                  value={filterSkills}
                  onChange={(e) => setFilterSkills(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Candidates Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Candidates ({filteredCandidates.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredCandidates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {candidates.length === 0 ? (
                    <>
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-lg mb-2">No candidates screened yet</p>
                      <p>Use the "PROCESS NEW CVs" button on the dashboard to start screening candidates from Gmail.</p>
                    </>
                  ) : (
                    <>
                      <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No candidates match your current filters.</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-3 font-semibold">Candidate Name</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Phone</th>
                        <th className="pb-3 font-semibold">Job Role</th>
                        <th className="pb-3 font-semibold">Extracted Skills</th>
                        <th className="pb-3 font-semibold">Fit Score</th>
                        <th className="pb-3 font-semibold">View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 font-medium">{candidate.name}</td>
                          <td className="py-3 text-sm">{candidate.email}</td>
                          <td className="py-3 text-sm">{candidate.phone}</td>
                          <td className="py-3 text-sm">{candidate.jobRole}</td>
                          <td className="py-3">
                            <div className="max-w-xs">
                              <div className="text-sm text-muted-foreground truncate" title={candidate.extractedSkills}>
                                {candidate.extractedSkills.split(',').slice(0, 3).join(', ')}
                                {candidate.extractedSkills.split(',').length > 3 && '...'}
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getFitScoreColor(candidate.fitScore)}`}>
                              {candidate.fitScore}%
                            </div>
                          </td>
                          <td className="py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(candidate)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Candidate Details Modal */}
        <Modal 
          open={showDetailsModal} 
          onClose={() => setShowDetailsModal(false)} 
          title={`Candidate Details - ${selectedCandidate?.name}`}
        >
          {selectedCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Name</h4>
                  <p>{selectedCandidate.name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Email</h4>
                  <p>{selectedCandidate.email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Phone</h4>
                  <p>{selectedCandidate.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Job Role</h4>
                  <p>{selectedCandidate.jobRole}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Fit Score</h4>
                <div className={`inline-flex items-center px-3 py-2 rounded-lg text-lg font-bold ${getFitScoreColor(selectedCandidate.fitScore)}`}>
                  {selectedCandidate.fitScore}%
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Extracted Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.extractedSkills.split(',').map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Full Summary</h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                  {selectedCandidate.summary}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Processing Details</h4>
                <p className="text-sm text-muted-foreground">
                  Processed on: {new Date(selectedCandidate.processedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </AppLayout>
    </ProtectedRoute>
  );
}
