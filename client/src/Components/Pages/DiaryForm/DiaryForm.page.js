import React, { useContext }  from 'react';

import { useParams, useLocation } from 'react-router-dom';

import { 
	Container,
	Paper,
} from '@material-ui/core';

import DiaryForm from '../../common/DiaryForm/DiaryForm';

import AppContext from '../../../utils/AppContext';

const useQuery = () => new URLSearchParams(useLocation().search);

export default function CalendarForm() {
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
	if(!('start' in event) || ('type' in event && event.type !== 1)) {
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
				<DiaryForm event={event}/>
			</Paper>
		</Container>
	)
}
