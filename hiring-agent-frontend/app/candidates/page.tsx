"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Upload } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Pending Review" | "Shortlisted" | "Rejected";
  fit_score?: number;
  skills?: string[];
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJob, setFilterJob] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return;

    setLoading(true);
    try {
      // TODO: Implement CV upload API call
      console.log("Uploading CV:", cvFile.name);
      
      // Reset form
      setCvFile(null);
      setShowUploadModal(false);
    } catch (error) {
      console.error("Failed to upload CV:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload CV
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                label="Search"
                placeholder="Name, email, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div>
                <label htmlFor="filter-job" className="mb-1.5 block text-sm font-medium">
                  Filter by Job
                </label>
                <select
                  id="filter-job"
                  title="Filter by Job"
                  className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30"
                  value={filterJob}
                  onChange={(e) => setFilterJob(e.target.value)}
                >
                  <option value="all">All Jobs</option>
                  <option value="senior-developer">Senior Developer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="ux-designer">UX Designer</option>
                </select>
              </div>
              <div>
                <label htmlFor="filter-status" className="mb-1.5 block text-sm font-medium">
                  Filter by Status
                </label>
                <select
                  id="filter-status"
                  title="Filter by Status"
                  className="h-10 w-full rounded-md border px-3 text-sm text-foreground border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Phone</th>
                    <th className="pb-3 font-semibold">Fit Score</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No candidates found. Upload a CV or integrate Google Sheets to get started.
                      </td>
                    </tr>
                  ) : (
                    candidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b border-border">
                        <td className="py-3">{candidate.name}</td>
                        <td className="py-3">{candidate.email}</td>
                        <td className="py-3">{candidate.phone}</td>
                        <td className="py-3">
                          {candidate.fit_score ? `${candidate.fit_score}%` : "N/A"}
                        </td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs ${getStatusColor(candidate.status)}`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Candidate CV">
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">CV File (PDF or Word)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full rounded-md border border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30"
                required
              />
              {cvFile && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected: {cvFile.name}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit" isLoading={loading}>
                Upload & Process
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </AppLayout>
    </ProtectedRoute>
  );
}
