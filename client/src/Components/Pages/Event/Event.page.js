import React, { useContext, useEffect, useState }  from 'react';

import { useParams } from 'react-router-dom';


import { 
	Container,
	Paper,
	Typography
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import EventForm from '../../common/EventForm/EventForm';

import AppContext from '../../../utils/AppContext';
import API from '../../../utils/API';

export default function Event() {
	const { classes, user: { events } } = useContext(AppContext);
	const { id } = useParams();
	const [severError, setSeverError] = useState(false);
	const event = events.filter((e)=> e.id === id)[0];

	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<Typography variant="h2" className={classes.formTitle} gutterBottom>
					Edit event
				</Typography>
				{ severError && <Alert severity="error">Something went wrong with loading data. Try again later.</Alert> }
				<EventForm event={event}/>
			</Paper>
		</Container>
	)
}
