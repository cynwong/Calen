import React, { useContext }  from 'react';

import { useParams, useLocation } from 'react-router-dom';

import { 
	Container,
	Paper,
} from '@material-ui/core';

import MealPlannerForm from '../../common/MealPlannerForm/MealPlannerForm';

import AppContext from '../../../utils/AppContext';

const useQuery = () => new URLSearchParams(useLocation().search);

export default function MealPlannerFormPage() {
	const { classes, user: { events } } = useContext(AppContext);
	const { id } = useParams();
	const uriQuery = useQuery();

	let event;
	if (id === 'new') {
		event = {
			start: uriQuery.get('start'),
			end: uriQuery.get('end'),
			allDay: uriQuery.get('allDay'),
		};
	} else {
		event = events.filter((e)=> e.id === id)[0];
	}
	if(!(event.start) || (event.type && event.type !== 3)) {
		const today = new Date();
		event = {
			start: today,
			end: today,
			allDay: true,
		};
	}
	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				<MealPlannerForm event={event}/>
			</Paper>
		</Container>
	)
}
