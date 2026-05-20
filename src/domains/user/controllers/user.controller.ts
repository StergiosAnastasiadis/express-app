import type { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import type { AuthUser, RegisterUser } from '../model/user.model.js';

import { db } from '../../../db/connect.js';
import { generateToken, getUser } from '../repository/user.repository.js';

export const authUser = async (req: Request<object, object, AuthUser>, res: Response) => {
  const { email, password } = req.body;

  const userInfo = await getUser(email);
  if (!userInfo) {
    return res.status(404).send({ error: true, message: 'User not found' });
  }

  if (!bcrypt.compareSync(password, userInfo.password)) {
    return res.status(403).send({ message: 'Incorrect Password' });
  }

  const user = generateToken(userInfo);

  res.status(200).send({ error: false, user, userInfo });
};

export const registerUser = async (req: Request<object, object, RegisterUser>, res: Response) => {
  const { email, firstname, lastname, password } = req.body;

  const user = await getUser(email);

  if (user) {
    res.status(400).send({ error: true, message: 'User Already Exists' });
    return;
  }

  const activationToken = randomBytes(20).toString('hex');

  const encryptedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (email, password, firstname, lastname, active, "activationToken") VALUES ($1, $2, $3, $4, $5, $6)',
    [email, encryptedPassword, firstname, lastname, false, activationToken],
  );

  res.send({ email, firstname, lastname });
};
