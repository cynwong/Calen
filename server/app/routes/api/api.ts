import { Router } from 'express';

import { checkIfAuthenticated, forwardIfNotAuthenticated } from '../../auth/expressPassport';

import eventsRoutes from './events/events';
// import forgotPasswordRoute from './forgotPassword/forgotPassword';
import loginRoute from './login/login';
import logOutRoute from './logout/logout';
import signUpRoute from './signup/signup';

const router = Router();

router.use('/signup', forwardIfNotAuthenticated, signUpRoute);
router.use('/login', loginRoute);
router.use('/logout', checkIfAuthenticated, logOutRoute);
// router.use('/forgotpassword', forgotPasswordRoute);

// router.use('/events', passport.authenticate('jwt'), eventsRoutes);
router.use('/events', checkIfAuthenticated, eventsRoutes);

export default router;
