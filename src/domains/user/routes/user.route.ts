import { Router } from 'express';

import { validate } from '../../../middleware/validate.middleware.js';
import { authUser, registerUser } from '../controllers/user.controller.js';
import { UserAuthSchema, UserRegisterSchema } from '../validators/user.validators.js';

const router = Router();

router.post('/', validate({ body: UserRegisterSchema }), registerUser);
router.post('/auth', validate({ body: UserAuthSchema }), authUser);

export default router;
