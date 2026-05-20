import _ from 'lodash';
import * as z from 'zod';

const email = z.email().transform((e) => e.toLowerCase().trim());
const password = z.string().transform((p) => p.trim());

const firstname = z
  .string()
  .min(2)
  .transform((f) => _.capitalize(f.trim()));

const lastname = z
  .string()
  .min(2)
  .transform((l) => _.capitalize(l.trim()));

export const UserAuthSchema = z.strictObject({
  email,
  password,
});

export const UserRegisterSchema = z.strictObject({
  email,
  firstname,
  lastname,
  password,
});
