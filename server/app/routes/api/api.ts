import { Router } from 'express';

import signUpRoute from './signup/signup';
import loginRoute from './login/login';
import logOutRoute from './logout/logout';
import eventsRoutes from './events/events';

const router = Router();

router.use('/signup', signUpRoute);
router.use('/login', loginRoute);
router.use('/logout', logOutRoute);

// router.use('/events', passport.authenticate('jwt'), eventsRoutes);
router.use('/events', eventsRoutes);

export default router;