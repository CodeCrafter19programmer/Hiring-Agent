import * as Auth from '../services/authService.js';

export const register = async (req, res) => {
  const { user, token } = await Auth.register(req.body);
  res.status(201).json({ user, token });
};

export const login = async (req, res) => {
  const { user, token } = await Auth.login(req.body);
  res.json({ user, token });
};

export const me = async (req, res) => {
  const user = await Auth.getUserById(req.user.id);
  res.json({ user });
};
