import { Router } from 'express';

import signUpRoute from './signup';
import loginRoute from './login';

const router = Router();

router.use('/signup', signUpRoute);
router.use('/login', loginRoute);

export default router;