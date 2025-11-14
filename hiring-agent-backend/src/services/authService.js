import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient.js';
import { JWT_SECRET } from '../config/env.js';

export async function register({ email, password, full_name, role = 'Applicant' }) {
  const password_hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({ email, password_hash, full_name, role })
    .select()
    .single();
  if (error) throw new Error(error.message);
  const token = jwt.sign({ id: data.id, role: data.role, email: data.email }, JWT_SECRET, { expiresIn: '7d' });
  return { user: sanitizeUser(data), token };
}

export async function login({ email, password }) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error || !user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  return { user: sanitizeUser(user), token };
}

export async function getUserById(id) {
  const { data, error } = await supabase.from('users').select('id,email,full_name,role,created_at').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

function sanitizeUser(u) {
  const { password_hash, ...rest } = u;
  return rest;
}
