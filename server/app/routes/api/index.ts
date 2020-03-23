import { Router } from 'express';

import signUpRoute from './signup';
import loginRoute from './login';
import logOutRoute from './logout';
import eventsRoutes from './events';

const router = Router();

router.use('/signup', signUpRoute);
router.use('/login', loginRoute);
router.use('/logout', logOutRoute);

router.use('/events', eventsRoutes);

export default router;