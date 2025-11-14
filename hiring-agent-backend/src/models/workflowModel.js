import { z } from 'zod';

export const TriggerWorkflowSchema = {
  body: z.object({
    job_id: z.string().uuid(),
    agent_id: z.string().uuid(),
    event: z.string().default('manual_trigger').optional(),
    input_payload: z.record(z.any()).optional(),
  }),
};

export const LogIdParam = {
  params: z.object({ id: z.string().regex(/^\d+$/, 'id must be numeric') }),
};

export const UpdateLogSchema = {
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({
    status: z.enum(['queued', 'running', 'succeeded', 'failed']).optional(),
    output_payload: z.record(z.any()).optional(),
  }),
};
