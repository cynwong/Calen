import React, { useContext }  from 'react';

import { useLocation } from 'react-router-dom';


import { 
	Container,
	Paper,
	Typography
} from '@material-ui/core';

import EventForm from '../../common/EventForm/EventForm';

import AppContext from '../../../utils/AppContext';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function NewEvent() {
	const { classes } = useContext(AppContext);

	// get data from uri query string
	const uriQuery = useQuery();
	const start = uriQuery.get('start');
	const end = uriQuery.get('end');
	const allDay = uriQuery.get('allday');

	const event = { start, end, allDay };

	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h2" className={classes.formTitle} gutterBottom>
					Add new event
				</Typography>
				<EventForm event={event}/>
			</Paper>
		</Container>
	)
}
