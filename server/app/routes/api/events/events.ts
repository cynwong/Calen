import { Router } from 'express';

import getEvent from './subRoutes/getEvent';
import allEventsRoute from './subRoutes/getAllEvents';
import postNewEvent from './subRoutes/postNewEvent';

const eventsRoutes = Router();

eventsRoutes.post('/', postNewEvent);
eventsRoutes.use('/all', allEventsRoute);
eventsRoutes.use('/:id', getEvent);

export default eventsRoutes;