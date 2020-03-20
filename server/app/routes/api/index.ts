import { Router } from 'express';

import signUpRoute from './signup';
import loginRoute from './login';
import logOutRoute from './logout';

const router = Router();

router.use('/signup', signUpRoute);
router.use('/login', loginRoute);
router.use('/logout', logOutRoute);

export default router;