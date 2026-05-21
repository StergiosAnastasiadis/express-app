import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import type { User } from '../model/user.model.js';

/**
 * Generates a JSON Web Token (JWT) for a given user.
 * * @param userInfo - The user object containing the email and unique identifier.
 * @returns A signed JWT string valid for 1 hour.
 * @throws {Error} If the `JWT_SECRET` environment variable is not defined.
 */
export const createJwtToken = (userInfo: User) => {
  const secret = process.env.JWT_SECRET;

  const payload = {
    email: userInfo.email,
  };

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  return jwt.sign(payload, secret, { expiresIn: '1h', subject: userInfo.id.toString() });
};

/**
 * Synchronously compares a plain-text password with a hashed password to check if they match.
 * * @param input - The plain-text password provided by the user.
 * @param saved - The securely hashed password retrieved from the database.
 * @returns `true` if the passwords match, otherwise `false`.
 */
export const isPasswordCorrect = (input: string, saved: string) => bcrypt.compareSync(input, saved);

/**
 * Generates a secure, random 20-byte hexadecimal string typically used for account activation or password resets.
 * * @returns A 40-character random hexadecimal string.
 */
export const createActivationHexCode = () => randomBytes(20).toString('hex');

/**
 * Asynchronously hashes a plain-text password using bcrypt with a salt round factor of 10.
 * * @param password - The plain-text password to encrypt.
 * @returns A promise that resolves to the securely hashed password string.
 */
export const encryptPassword = async (password: string) => await bcrypt.hash(password, 10);
