import supabaseService from '../services/supabaseService.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const register = async (req, res) => {
  const { email, password, full_name, role } = req.body;

  const roleLower = (role || 'Recruiter').toString().toLowerCase();

  const result = await supabaseService.signUp(email, password, roleLower);

  if (!result.success) {
    return res.status(400).json({
      error: 'Registration failed',
      message: result.error,
    });
  }

  // Map role back to Title case to match frontend expectations
  const roleTitle = (roleLower.charAt(0).toUpperCase() + roleLower.slice(1));

  // If signUp didn't return the user object fully populated, sign in to fetch id
  let userId = result.user?.id;
  if (!userId) {
    const loginResult = await supabaseService.signIn(email, password);
    if (loginResult.success) {
      userId = loginResult.user?.id;
    }
  }

  const payload = { id: userId, email, role: roleTitle };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({
    user: {
      id: userId,
      email: email,
      full_name: full_name || undefined,
      role: roleTitle,
      created_at: new Date().toISOString(),
    },
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  const result = await supabaseService.signIn(email, password);
  
  if (!result.success) {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      message: result.error 
    });
  }

  // Extract user role from metadata or default to recruiter
  const roleRaw = result.user.user_metadata?.role || 'recruiter';
  const role = roleRaw.charAt(0).toUpperCase() + roleRaw.slice(1);

  const payload = { id: result.user.id, email: result.user.email, role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  res.json({ 
    user: {
      id: result.user.id,
      email: result.user.email,
      role: role,
    },
    token,
  });
};

export const logout = async (req, res) => {
  // For JWT-based auth, client can simply discard the token
  res.json({ message: 'Logged out successfully' });
};

export const me = async (req, res) => {
  // req.user is populated by JWT middleware
  if (!req.user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  res.json({ user: req.user });
};
