import { Router } from 'express';

import allEventsRoute from './subRoutes/getAllEvents';
import postNewEvent from './subRoutes/postNewEvent';

const eventsRoutes = Router();

eventsRoutes.post('/', postNewEvent);
eventsRoutes.use('/all', allEventsRoute);

export default eventsRoutes;