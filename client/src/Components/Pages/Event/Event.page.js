import React, { useContext }  from 'react';

import { useParams } from 'react-router-dom';


import { 
	Container,
	Paper,
	Typography
} from '@material-ui/core';

import EventForm from '../../common/EventForm/EventForm';

import AppContext from '../../../utils/AppContext';

export default function Event() {
	const { classes, user: { events } } = useContext(AppContext);
	const { id } = useParams();
	const event = events.filter((e)=> e.id === id)[0];

	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h2" className={classes.formTitle} gutterBottom>
					Edit event
				</Typography>
				<EventForm event={event}/>
			</Paper>
		</Container>
	)
}
