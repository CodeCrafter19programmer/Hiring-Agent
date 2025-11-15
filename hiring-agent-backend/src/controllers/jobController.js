import sheetsService from '../services/sheetsService.js';

export const create = async (req, res) => {
  const job = await sheetsService.createJobRequirement(req.body);
  res.status(201).json({ data: job });
};

export const list = async (req, res) => {
  const jobs = await sheetsService.getJobRequirements();
  res.json({ data: jobs });
};

export const get = async (req, res) => {
  const job = await sheetsService.getJobRequirement(req.params.id);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  res.json({ data: job });
};

export const update = async (req, res) => {
  const job = await sheetsService.updateJobRequirement(req.params.id, req.body);
  res.json({ data: job });
};

export const remove = async (req, res) => {
  const result = await sheetsService.deleteJobRequirement(req.params.id);
  res.json({ data: result });
};
