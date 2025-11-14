import * as Workflows from '../services/workflowService.js';

export const trigger = async (req, res) => {
  const data = await Workflows.triggerWorkflow(req.body, req.user.id);
  res.status(201).json({ data });
};

export const listLogs = async (req, res) => {
  const data = await Workflows.listLogs();
  res.json({ data });
};

export const getLog = async (req, res) => {
  const data = await Workflows.getLog(req.params.id);
  res.json({ data });
};

export const updateLog = async (req, res) => {
  const data = await Workflows.updateLog(req.params.id, req.body);
  res.json({ data });
};
