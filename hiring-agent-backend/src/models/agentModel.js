import { z } from 'zod';

export const AgentIdParam = {
  params: z.object({ id: z.string().uuid() }),
};

export const AgentCreateSchema = {
  body: z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    config: z.record(z.any()).optional(),
  }),
};

export const AgentUpdateSchema = {
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    config: z.record(z.any()).optional(),
  }),
};
