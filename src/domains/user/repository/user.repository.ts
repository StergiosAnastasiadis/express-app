import type { QueryResult } from 'pg';

import type { User } from '../model/user.model.js';

import { db } from '../../../db/connect.js';

interface CreateUserInput {
  activationToken: string;
  email: string;
  encryptedPassword: string;
  firstname: string;
  lastname: string;
}

/**
 * Inserts a new user into the database
 */
export const createUser = async (userData: CreateUserInput): Promise<void> => {
  const { activationToken, email, encryptedPassword, firstname, lastname } = userData;

  await db.query(
    'INSERT INTO users (email, password, firstname, lastname, active, "activationToken") VALUES ($1, $2, $3, $4, $5, $6)',
    [email, encryptedPassword, firstname, lastname, false, activationToken],
  );
};

/**
 * Fetches a user by email
 */
export const getUserByEmail = async (email: string) => {
  const query = `SELECT id, email, password, firstname, lastname FROM users WHERE email='${email}'`;
  const user: QueryResult<User> = await db.query(query);

  if (user.rows.length > 0) return user.rows[0];

  return false;
};
