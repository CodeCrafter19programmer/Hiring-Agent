import { api } from '../api';

export interface Job {
  id: string;
  title: string;
  requiredSkills: string;
  experienceLevel: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateJobData {
  title: string;
  requiredSkills: string;
  experienceLevel: string;
  description: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {}

export const jobsService = {
  async getJobs(): Promise<{ data: Job[] }> {
    return api.get('/jobs');
  },

  async getJob(id: string): Promise<{ data: Job }> {
    return api.get(`/jobs/${id}`);
  },

  async createJob(jobData: CreateJobData): Promise<{ data: Job }> {
    return api.post('/jobs', jobData);
  },

  async updateJob(id: string, jobData: UpdateJobData): Promise<{ data: Job }> {
    return api.put(`/jobs/${id}`, jobData);
  },

  async deleteJob(id: string): Promise<{ data: { success: boolean } }> {
    return api.delete(`/jobs/${id}`);
  },
};
