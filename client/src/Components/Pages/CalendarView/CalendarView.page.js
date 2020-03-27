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

	const [renderOptions, setRenderOptions] = useState({
		header: {
			left: '',
			center: 'prev,title,next',
			right: ''
		},
		events: [...events],
		view: 'dayGridMonth'
	});

	switch (key) {
		case 'calendar': 
			setRenderOptions({
				...renderOptions,
				events: [...events].filter((e) => e.type === 0),
				header: {
					left: 'today',
					center: 'prev,title,next',
					right:'dayGridMonth,timeGridWeek,timeGridDay,listDay'
				}
			});
			break;
		case 'diary': 
			setRenderOptions({
				...renderOptions,
				events: [...events].filter((e) => e.type === 1),
			});
			break;
		case 'mealplans': 
			setRenderOptions({
				...renderOptions,
				events: [...events].filter((e) => e.type === 2),
			});
			break;
		case 'tasks':
			setRenderOptions({
				...renderOptions,
				events: [...events].filter((e) => e.type === 3),
				view: 'listDay'
			});
			break;
		default: 
	}

	
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
				default:
			}
		}
		history.push(`/${route}/${id}`);
	};

	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent events={renderOptions.events} selectDates={selectDates} eventClick={eventClick} header={renderOptions.header} view={renderOptions.view}/>
			</Paper>
		</Container>
	)
}
