'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface WorkflowLog {
  id: number;
  job_id?: string;
  agent_id?: string;
  user_id?: string;
  event: string;
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  input_payload?: Record<string, any>;
  output_payload?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

export function useWorkflowLogs(params?: Record<string, any>) {
  return useQuery({
    queryKey: ['workflow-logs', params],
    queryFn: () => api.get<{ data: WorkflowLog[] }>('/workflows/logs', params),
  });
}

export function useWorkflowLog(id: string) {
  return useQuery({
    queryKey: ['workflow-log', id],
    queryFn: () => api.get<{ data: WorkflowLog }>(`/workflows/logs/${id}`),
    enabled: !!id,
    refetchInterval: (data: { data?: WorkflowLog }) => {
      // Poll every 3 seconds if status is queued or running
      const status = data?.data?.status;
      return status === 'queued' || status === 'running' ? 3000 : false;
    },
  });
}

export function useTriggerWorkflow() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { job_id: string; agent_ids: string[]; input_payload?: Record<string, any> }) =>
      api.post<{ data: WorkflowLog }>('/workflows/trigger', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-logs'] });
    },
  });
}

export function useUpdateWorkflowLog(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<WorkflowLog>) =>
      api.patch<{ data: WorkflowLog }>(`/workflows/logs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-logs'] });
      queryClient.invalidateQueries({ queryKey: ['workflow-log', id] });
    },
  });
}
