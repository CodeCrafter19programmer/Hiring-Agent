import { api } from '../api';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobRole: string;
  extractedSkills: string;
  fitScore: number;
  summary: string;
  processedAt: string;
}

export interface CandidateStats {
  totalCandidates: number;
  screenedThisWeek: number;
  jobsOpen: number;
  averageFitScore: number;
}

export const candidatesService = {
  async getCandidates(): Promise<{ data: Candidate[] }> {
    return api.get('/candidates');
  },

  async getCandidateStats(): Promise<{ data: CandidateStats }> {
    return api.get('/candidates/stats');
  },
};
