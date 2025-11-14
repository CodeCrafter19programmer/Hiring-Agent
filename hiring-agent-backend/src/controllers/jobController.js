import * as Jobs from '../services/jobService.js';

export const create = async (req, res) => {
  const data = await Jobs.createJob(req.body, req.user.id);
  res.status(201).json({ data });
};

export const list = async (req, res) => {
  const data = await Jobs.listJobs();
  res.json({ data });
};

export const get = async (req, res) => {
  const data = await Jobs.getJob(req.params.id);
  res.json({ data });
};

export const update = async (req, res) => {
  const data = await Jobs.updateJob(req.params.id, req.body);
  res.json({ data });
};

export const remove = async (req, res) => {
  const data = await Jobs.deleteJob(req.params.id);
  res.json({ data });
};
