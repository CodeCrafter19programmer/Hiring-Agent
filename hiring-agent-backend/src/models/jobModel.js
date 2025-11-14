import { z } from 'zod';

export const JobIdParam = {
  params: z.object({ id: z.string().uuid() }),
};

export const JobCreateSchema = {
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['open', 'closed', 'draft']).optional(),
  }),
};

export const JobUpdateSchema = {
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['open', 'closed', 'draft']).optional(),
  }),
};
