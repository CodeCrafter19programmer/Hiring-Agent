import * as Agents from '../services/agentService.js';

export const create = async (req, res) => {
  const data = await Agents.createAgent(req.body, req.user.id);
  res.status(201).json({ data });
};

export const list = async (req, res) => {
  const data = await Agents.listAgents();
  res.json({ data });
};

export const get = async (req, res) => {
  const data = await Agents.getAgent(req.params.id);
  res.json({ data });
};

export const update = async (req, res) => {
  const data = await Agents.updateAgent(req.params.id, req.body);
  res.json({ data });
};

export const remove = async (req, res) => {
  const data = await Agents.deleteAgent(req.params.id);
  res.json({ data });
};
