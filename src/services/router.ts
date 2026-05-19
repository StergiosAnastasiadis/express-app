import { Router } from 'express';

import userRoutes from '../domains/user/routes/user.route.js';

const router = Router();

router.use('/api/users', userRoutes);

export default router;
