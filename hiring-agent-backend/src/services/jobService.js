import { supabase } from '../config/supabaseClient.js';

export async function createJob({ title, description, status = 'open' }, userId) {
  const { data, error } = await supabase
    .from('jobs')
    .insert({ title, description, status, created_by: userId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function listJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getJob(id) {
  const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateJob(id, fields) {
  const { data, error } = await supabase
    .from('jobs')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteJob(id) {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return { id };
}
