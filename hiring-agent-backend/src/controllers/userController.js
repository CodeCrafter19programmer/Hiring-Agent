import * as Users from '../services/userService.js';

export const list = async (req, res) => {
  const data = await Users.listUsers();
  res.json({ data });
};

export const get = async (req, res) => {
  const data = await Users.getUser(req.params.id);
  res.json({ data });
};

export const updateRole = async (req, res) => {
  const data = await Users.updateUserRole(req.params.id, req.body.role);
  res.json({ data });
};

export const remove = async (req, res) => {
  const data = await Users.deleteUser(req.params.id);
  res.json({ data });
};
