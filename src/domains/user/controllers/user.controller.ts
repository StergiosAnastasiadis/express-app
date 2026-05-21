import type { Request, Response } from 'express';

import type { AuthUser, RegisterUser } from '../model/user.model.js';

import { createUser, getUserByEmail } from '../repository/user.repository.js';
import {
  createActivationHexCode,
  createJwtToken,
  encryptPassword,
  isPasswordCorrect,
} from '../services/user.service.js';

export const authUser = async (req: Request<object, object, AuthUser>, res: Response) => {
  const { email, password } = req.body;

  const userInfo = await getUserByEmail(email);

  if (!userInfo || !isPasswordCorrect(password, userInfo.password)) {
    return res.status(401).send({ error: true, message: 'Invalid username or password.' });
  }

  const token = createJwtToken(userInfo);

  const userInfoResponse = { email: userInfo.email, firstname: userInfo.firstname, lastname: userInfo.lastname };

  res.status(200).send({ error: false, token, userInfo: userInfoResponse });
};

export const registerUser = async (req: Request<object, object, RegisterUser>, res: Response) => {
  const { email, firstname, lastname, password } = req.body;

  const user = await getUserByEmail(email);

  if (user) {
    res.status(409).send({ error: true, message: 'An account with this email address already exists.' });
    return;
  }

  const activation_token = createActivationHexCode();

  const encryptedPassword = await encryptPassword(password);

  await createUser({
    activation_token,
    email,
    encryptedPassword,
    firstname,
    lastname,
  });

  res.status(201).send({ error: false, message: `User Created Successfully` });
};
