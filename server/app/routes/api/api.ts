import { Router } from 'express';

import { checkIfAuthenticated, forwardIfNotAuthenticated } from '../../auth/expressPassport';

import signUpRoute from './signup/signup';
import loginRoute from './login/login';
import logOutRoute from './logout/logout';
import eventsRoutes from './events/events';

const router = Router();

router.use('/signup',forwardIfNotAuthenticated, signUpRoute);
router.use('/login', loginRoute);
router.use('/logout', checkIfAuthenticated, logOutRoute);

// router.use('/events', passport.authenticate('jwt'), eventsRoutes);
router.use('/events', checkIfAuthenticated, eventsRoutes);

export default router;