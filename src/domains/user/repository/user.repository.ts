import type { QueryResult } from 'pg';

import jwt from 'jsonwebtoken';

import type { User } from '../model/user.model.js';

import { db } from '../../../db/connect.js';

export const getUser = async (email: string) => {
  const query = `SELECT email, password, firstname, lastname FROM users WHERE email='${email}'`;
  const user: QueryResult<User> = await db.query(query);

  if (user.rows.length > 0) return user.rows[0];

  return false;
};

export const generateToken = (userInfo: User) => {
  return jwt.sign(userInfo, 'JWT_SECRET', { expiresIn: '1h' });
};
