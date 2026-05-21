import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import type { User } from '../model/user.model.js';

export const createJwtToken = (userInfo: User) => {
  return jwt.sign(userInfo, 'JWT_SECRET', { expiresIn: '1h' });
};

export const isPasswordCorrect = (input: string, saved: string) => bcrypt.compareSync(input, saved);

export const createActivationHexCode = () => randomBytes(20).toString('hex');

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);
