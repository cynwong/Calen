import React, { useContext, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext';

export default function CalendarContainer() {
	const { classes, user: { events }} = useContext(AppContext);
	const { key } = useParams();
	const history = useHistory();
	let defaultView = 'dayGridMonth'
	const header = {
		left: '',
		center: 'prev,title,next',
		right: ''
	};
	let displayEvents = [...events];

	switch (key) {
		case 'calendar': 
			displayEvents = displayEvents.filter((e) => e.type === 0);
			header.left = 'today';
			header.right = 'dayGridMonth,timeGridWeek,timeGridDay,listDay';
			break;
		case 'diary': 
			displayEvents = displayEvents.filter((e) => e.type === 1);
			break;
		case 'mealplans': 
			displayEvents = displayEvents.filter((e) => e.type === 2);
			break;
		case 'tasks':
			defaultView = 'listDay';
			displayEvents = displayEvents.filter((e) => e.type === 3);
			break;
		default: 
	}

	const [view,setView] = useState(defaultView);
	// This function will invoke when user select time or click on a date
	const selectDates = ({startStr, endStr, allDay}) => {
		if(key === 'diary') {
			// search if there is already an entry
			const start = moment(startStr).startOf('day');
			const event = events.filter((e) => moment(e.start).isSame(start))[0];
			if(event && 'id' in event) {
				return eventClick({event});
			}
		}
		history.push(`/${key}/new?start=${startStr}&end=${endStr}&allDay=${allDay}`);
	};

	// Event onClick listener invoked when user clicked on an event
	const eventClick = ({event}) => {
		const {id, type} = event;
		let route = key ? key : null;
		if (!route) {
			switch (type) {
				case 0: 
					route = 'calendar';
					break;
				case 1: 
					route = 'diary';
					break;
				case 2: 
					route = 'mealplans';
					break;
				case 3:
					route = 'tasks';
					break;
			}
		}
		history.push(`/${route}/${id}`);
	};

	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent events={displayEvents} selectDates={selectDates} eventClick={eventClick} header={header} view={view}/>
			</Paper>
		</Container>
	)
}
