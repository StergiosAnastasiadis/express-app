import jwt from 'jsonwebtoken';

import type { User } from '../domains/user/model/user.model.js';

export const generateToken = (userInfo: User) => {
  return jwt.sign(userInfo, 'JWT_SECRET', { expiresIn: '1h' });
};
