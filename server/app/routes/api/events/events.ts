import { Router } from 'express';

import allEventsRoute from './getAllEvents';
import postNewEvent from './postNewEvent';

const eventsRoutes = Router();

eventsRoutes.post('/', postNewEvent);
eventsRoutes.use('/all', allEventsRoute);

export default eventsRoutes;