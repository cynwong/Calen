import { Router } from 'express';

import allEventsRoute from './subRoutes/getAllEvents';
import deleteEventRoute from './subRoutes/deleteEvent';
import getEventRoute from './subRoutes/getEvent';
import postNewEventRoute from './subRoutes/postNewEvent';
import putEventRoute from './subRoutes/putEvent';

const eventsRoutes = Router();

eventsRoutes.post('/', postNewEventRoute);
eventsRoutes.use('/all', allEventsRoute);
eventsRoutes.get('/:id', getEventRoute);
eventsRoutes.put('/:id', putEventRoute);
eventsRoutes.delete('/:id', deleteEventRoute);

export default eventsRoutes;
