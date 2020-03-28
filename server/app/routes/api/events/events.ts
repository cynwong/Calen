import { Router } from 'express';

import getAllEventAPI from './subRoutes/getAllEvents';
import deleteEventAPI from './subRoutes/deleteEvent';
import getEventAPI from './subRoutes/getEvent';
import postNewEventAPI from './subRoutes/postNewEvent';
import putEventAPI from './subRoutes/putEvent';

const eventsRoutes = Router();

eventsRoutes.post('/', postNewEventAPI);
eventsRoutes.use('/all', getAllEventAPI);
eventsRoutes.get('/:id', getEventAPI);
eventsRoutes.put('/:id', putEventAPI);
eventsRoutes.delete('/:id', deleteEventAPI);

export default eventsRoutes;
