import { Router, Request, Response, NextFunction } from 'express';

import allEventsRoute from './getAllEvents';

const eventsRoutes = Router();

eventsRoutes.use('/all', allEventsRoute);

export default eventsRoutes;