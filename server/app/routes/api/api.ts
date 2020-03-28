import { Router } from 'express';

import { checkIfAuthenticated, forwardIfNotAuthenticated } from '../../auth/expressPassport';

import eventsRoutes from './events/events';
import settingsRoutes from './settings/settings';

// import forgotPasswordRoute from './forgotPassword/forgotPassword';
import LoginAPI from './login/login';
import logOutAPI from './logout/logout';
import signUpAPI from './signup/signup';
import isUserLoginAPI from './isLogIn/isLogIn';

const router = Router();

router.use('/signup', forwardIfNotAuthenticated, signUpAPI);
router.use('/getlogin', isUserLoginAPI);
router.use('/login', LoginAPI);
router.use('/logout', checkIfAuthenticated, logOutAPI);
// router.use('/forgotpassword', forgotPasswordRoute);

// router.use('/events', passport.authenticate('jwt'), eventsRoutes);
router.use('/events', checkIfAuthenticated, eventsRoutes);
router.use('/settings', checkIfAuthenticated, settingsRoutes);

export default router;
