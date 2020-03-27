import React, { useContext }  from 'react';

import { useParams, useLocation } from 'react-router-dom';

import { 
	Container,
	Paper,
} from '@material-ui/core';

import DiaryForm from '../../common/DiaryForm/DiaryForm';
import EventForm from '../../common/EventForm/EventForm';
import TaskForm from '../../common/TaskForm/TaskForm';

import AppContext from '../../../utils/AppContext';

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Form() {
	const { classes, user: { events } } = useContext(AppContext);
	const { id, key } = useParams();
	const uriQuery = useQuery();
	let event;
	if (id === 'new') {
		event = {
			start: uriQuery.get('start'),
			end: uriQuery.get('end'),
			allDay: uriQuery.get('allDay'),
		}
	} else {
		event = events.filter((e)=> e.id === id)[0];
	}

	const displayForm = () => {
		switch (key) {
			case 'calendar': 
				return (<EventForm event={event}/>);
			case 'diary': 
				return (<DiaryForm event={event}/>)
			case 'mealplans': 
				return (<></>)
			case 'tasks':
				return (<TaskForm event={event}/>)
			default: 
		}
	}
	return (
		<Container className={classes.container}>
			<Paper className={classes.paper}>
				{displayForm()}
			</Paper>
		</Container>
	)
}
