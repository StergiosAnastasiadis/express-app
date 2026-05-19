import { Router } from 'express';

import { authUser, registerUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/', registerUser);
router.post('/auth', authUser);

export default router;
