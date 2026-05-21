import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import type { User } from '../model/user.model.js';

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

export const isPasswordCorrect = (input: string, saved: string) => bcrypt.compareSync(input, saved);

export const createActivationHexCode = () => randomBytes(20).toString('hex');

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);
