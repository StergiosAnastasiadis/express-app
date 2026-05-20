import _ from 'lodash';
import * as z from 'zod';

const email = z.string().transform((e) => e.toLowerCase().trim());
const password = z.string().transform((p) => p.trim());

export const UserAuthSchema = z.strictObject({
  email,
  password,
});

export const UserRegisterSchema = z.strictObject({
  email: z.email(),
  firstname: z
    .string()
    .min(2)
    .transform((f) => _.capitalize(f.trim())),
  lastname: z
    .string()
    .min(2)
    .transform((l) => _.capitalize(l.trim())),
  password,
});
