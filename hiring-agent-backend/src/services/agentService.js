import { supabase } from '../config/supabaseClient.js';

export async function createAgent({ name, type, config = {} }, userId) {
  const { data, error } = await supabase
    .from('agents')
    .insert({ name, type, config, created_by: userId })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function listAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getAgent(id) {
  const { data, error } = await supabase.from('agents').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAgent(id, fields) {
  const { data, error } = await supabase
    .from('agents')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteAgent(id) {
  const { error } = await supabase.from('agents').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return { id };
}
