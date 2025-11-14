import { supabase } from '../config/supabaseClient.js';

export async function listUsers() {
  const { data, error } = await supabase.from('users').select('id,email,full_name,role,created_at').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getUser(id) {
  const { data, error } = await supabase.from('users').select('id,email,full_name,role,created_at').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserRole(id, role) {
  const { data, error } = await supabase
    .from('users')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id,email,full_name,role,updated_at')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteUser(id) {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return { id };
}
