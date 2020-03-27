import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext'

export default function DashBoard() {
	const { classes, user: { events } } = useContext(AppContext);

	const history = useHistory();

	const selectDates = ({ allDay, endStr, startStr}) => {
		history.push(`/events/new?start=${startStr}&end=${endStr}&allDay=${allDay}`);
	};

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`events/${id}`);
	};

	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent events={events} selectDates={selectDates} eventClick={eventClick} leftHeader='today' rightHeader='dayGridMonth,timeGridWeek,timeGridDay,listDay' />
			</Paper>
		</Container>
	)
}
