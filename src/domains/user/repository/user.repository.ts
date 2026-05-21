import type { QueryResult } from 'pg';

import type { User } from '../model/user.model.js';

import { db } from '../../../db/connect.js';

export const getUserByEmail = async (email: string) => {
  const query = `SELECT id, email, password, firstname, lastname FROM users WHERE email='${email}'`;
  const user: QueryResult<User> = await db.query(query);

  if (user.rows.length > 0) return user.rows[0];

  return false;
};
