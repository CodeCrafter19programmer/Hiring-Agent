import { google } from 'googleapis';
import {
  GOOGLE_SHEETS_SPREADSHEET_ID,
  GOOGLE_SHEETS_JOB_REQUIREMENTS_SHEET,
  GOOGLE_SHEETS_SCREENED_CANDIDATES_SHEET,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY
} from '../config/env.js';

class SheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Google Sheets credentials not configured');
    }

    try {
      this.auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: GOOGLE_PRIVATE_KEY,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      this.initialized = true;
      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Sheets service:', error);
      throw error;
    }
  }

  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // Job Requirements Methods
  async getJobRequirements() {
    await this.ensureInitialized();

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_JOB_REQUIREMENTS_SHEET}!A:F`,
      });

      const rows = response.data.values || [];
      if (rows.length === 0) return [];

      // Skip header row and map data
      const headers = rows[0];
      return rows.slice(1).map((row, index) => ({
        id: row[0] || `job_${index + 1}`,
        title: row[1] || '',
        requiredSkills: row[2] || '',
        experienceLevel: row[3] || '',
        description: row[4] || '',
        createdAt: row[5] || new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching job requirements:', error);
      throw error;
    }
  }

  async getJobRequirement(id) {
    const jobs = await this.getJobRequirements();
    return jobs.find(job => job.id === id);
  }

  async createJobRequirement(jobData) {
    await this.ensureInitialized();

    try {
      const newJob = {
        id: `job_${Date.now()}`,
        title: jobData.title,
        requiredSkills: jobData.requiredSkills,
        experienceLevel: jobData.experienceLevel,
        description: jobData.description,
        createdAt: new Date().toISOString(),
      };

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_JOB_REQUIREMENTS_SHEET}!A:F`,
        valueInputOption: 'RAW',
        resource: {
          values: [[
            newJob.id,
            newJob.title,
            newJob.requiredSkills,
            newJob.experienceLevel,
            newJob.description,
            newJob.createdAt,
          ]],
        },
      });

      return newJob;
    } catch (error) {
      console.error('Error creating job requirement:', error);
      throw error;
    }
  }

  async updateJobRequirement(id, jobData) {
    await this.ensureInitialized();

    try {
      const jobs = await this.getJobRequirements();
      const jobIndex = jobs.findIndex(job => job.id === id);
      
      if (jobIndex === -1) {
        throw new Error(`Job with id ${id} not found`);
      }

      const updatedJob = {
        ...jobs[jobIndex],
        ...jobData,
        updatedAt: new Date().toISOString(),
      };

      // Update the specific row (jobIndex + 2 because of header row and 0-based index)
      const rowNumber = jobIndex + 2;
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_JOB_REQUIREMENTS_SHEET}!A${rowNumber}:F${rowNumber}`,
        valueInputOption: 'RAW',
        resource: {
          values: [[
            updatedJob.id,
            updatedJob.title,
            updatedJob.requiredSkills,
            updatedJob.experienceLevel,
            updatedJob.description,
            updatedJob.updatedAt || updatedJob.createdAt,
          ]],
        },
      });

      return updatedJob;
    } catch (error) {
      console.error('Error updating job requirement:', error);
      throw error;
    }
  }

  async deleteJobRequirement(id) {
    await this.ensureInitialized();

    try {
      const jobs = await this.getJobRequirements();
      const jobIndex = jobs.findIndex(job => job.id === id);
      
      if (jobIndex === -1) {
        throw new Error(`Job with id ${id} not found`);
      }

      // Delete the specific row (jobIndex + 2 because of header row and 0-based index)
      const rowNumber = jobIndex + 2;
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        resource: {
          requests: [{
            deleteDimension: {
              range: {
                sheetId: 0, // Assuming first sheet
                dimension: 'ROWS',
                startIndex: rowNumber - 1,
                endIndex: rowNumber,
              },
            },
          }],
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting job requirement:', error);
      throw error;
    }
  }

  // Screened Candidates Methods
  async getScreenedCandidates() {
    await this.ensureInitialized();

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_SCREENED_CANDIDATES_SHEET}!A:I`,
      });

      const rows = response.data.values || [];
      if (rows.length === 0) return [];

      // Skip header row and map data
      return rows.slice(1).map((row, index) => ({
        id: row[0] || `candidate_${index + 1}`,
        name: row[1] || '',
        email: row[2] || '',
        phone: row[3] || '',
        jobRole: row[4] || '',
        extractedSkills: row[5] || '',
        fitScore: parseInt(row[6]) || 0,
        summary: row[7] || '',
        processedAt: row[8] || new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching screened candidates:', error);
      throw error;
    }
  }

  async getCandidateStats() {
    try {
      const candidates = await this.getScreenedCandidates();
      const jobs = await this.getJobRequirements();
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const screenedThisWeek = candidates.filter(candidate => 
        new Date(candidate.processedAt) >= oneWeekAgo
      ).length;

      return {
        totalCandidates: candidates.length,
        screenedThisWeek,
        jobsOpen: jobs.length,
        averageFitScore: candidates.length > 0 
          ? Math.round(candidates.reduce((sum, c) => sum + c.fitScore, 0) / candidates.length)
          : 0,
      };
    } catch (error) {
      console.error('Error getting candidate stats:', error);
      throw error;
    }
  }
}

export default new SheetsService();
