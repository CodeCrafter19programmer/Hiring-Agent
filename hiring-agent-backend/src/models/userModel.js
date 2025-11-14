import { z } from 'zod';

export const RoleEnum = z.enum(['Admin', 'Recruiter', 'Applicant']);

export const RegisterSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    full_name: z.string().optional(),
    role: RoleEnum.optional(),
  }),
};

export const LoginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
};

export const UpdateRoleSchema = {
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ role: RoleEnum }),
};
