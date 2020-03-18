import { Router } from 'express';

import signUpRoute from './signup';

const router = Router();

router.use('/signup', signUpRoute);

export default router;