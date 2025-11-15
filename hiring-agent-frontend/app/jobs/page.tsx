"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Plus, Edit2, Trash2, Briefcase } from "lucide-react";
import { jobsService, Job, CreateJobData } from "@/lib/services/jobs";

export default function JobRequirementsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<CreateJobData>({
    title: '',
    requiredSkills: '',
    experienceLevel: '',
    description: ''
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsService.getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await jobsService.updateJob(editingJob.id, formData);
      } else {
        await jobsService.createJob(formData);
      }
      
      // Reset form and reload jobs
      setFormData({ title: '', requiredSkills: '', experienceLevel: '', description: '' });
      setEditingJob(null);
      setShowCreateForm(false);
      await loadJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      requiredSkills: job.requiredSkills,
      experienceLevel: job.experienceLevel,
      description: job.description
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (jobId: string) => {
    if (confirm('Are you sure you want to delete this job requirement?')) {
      try {
        await jobsService.deleteJob(jobId);
        await loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', requiredSkills: '', experienceLevel: '', description: '' });
    setEditingJob(null);
    setShowCreateForm(false);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AppLayout>
          <div className="flex items-center justify-center min-h-64">
            <div className="text-lg">Loading job requirements...</div>
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
              <h1 className="text-3xl font-bold">Job Requirements</h1>
              <p className="text-muted-foreground">Manage job roles & requirements for CV screening</p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Job Role
            </Button>
          </div>

          {/* Create/Edit Form */}
          {showCreateForm && (
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>
                  {editingJob ? 'Edit Job Requirement' : 'Create New Job Requirement'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Job Title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                      placeholder="e.g., Senior Software Developer"
                    />
                    <Input
                      label="Experience Level"
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                      required
                      placeholder="e.g., 3-5 years, Senior, Mid-level"
                    />
                  </div>
                  <Input
                    label="Required Skills"
                    value={formData.requiredSkills}
                    onChange={(e) => setFormData(prev => ({ ...prev, requiredSkills: e.target.value }))}
                    required
                    placeholder="e.g., React, Node.js, TypeScript, AWS (comma-separated)"
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      rows={4}
                      required
                      placeholder="Detailed job description and requirements..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingJob ? 'Update Job' : 'Create Job'}
                    </Button>
                    <Button type="button" variant="ghost" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Requirements ({jobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No job requirements defined yet. Create your first job requirement to start screening candidates.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-3 font-semibold">Job ID</th>
                        <th className="pb-3 font-semibold">Job Title</th>
                        <th className="pb-3 font-semibold">Required Skills</th>
                        <th className="pb-3 font-semibold">Experience Level</th>
                        <th className="pb-3 font-semibold">Description</th>
                        <th className="pb-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="border-b border-border">
                          <td className="py-3 font-mono text-sm">{job.id}</td>
                          <td className="py-3 font-medium">{job.title}</td>
                          <td className="py-3 text-sm">
                            <div className="max-w-xs truncate" title={job.requiredSkills}>
                              {job.requiredSkills}
                            </div>
                          </td>
                          <td className="py-3 text-sm">{job.experienceLevel}</td>
                          <td className="py-3 text-sm">
                            <div className="max-w-xs truncate" title={job.description}>
                              {job.description}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(job)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(job.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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
      </AppLayout>
    </ProtectedRoute>
  );
}
