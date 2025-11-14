import { supabase } from '../config/supabaseClient.js';
import { sendWebhook } from './notificationService.js';

export async function triggerWorkflow({ job_id, agent_id, event = 'manual_trigger', input_payload = {} }, userId) {
  const { data, error } = await supabase
    .from('workflow_logs')
    .insert({ job_id, agent_id, user_id: userId, event, status: 'queued', input_payload })
    .select()
    .single();
  if (error) throw new Error(error.message);
  // fire-and-forget webhook notification
  sendWebhook({ type: 'workflow.triggered', log: data }).catch(() => {});
  return data;
}

export async function listLogs() {
  const { data, error } = await supabase
    .from('workflow_logs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getLog(id) {
  const { data, error } = await supabase.from('workflow_logs').select('*').eq('id', Number(id)).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateLog(id, fields) {
  const { data, error } = await supabase.from('workflow_logs').update(fields).eq('id', Number(id)).select().single();
  if (error) throw new Error(error.message);
  return data;
}
