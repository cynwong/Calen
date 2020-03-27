import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext'

export default function CalendarPage() {
	const { classes, user: { events } } = useContext(AppContext);

	const history = useHistory();

	const selectDates = ({ allDay, endStr, startStr}) => {
		history.push(`/calendar/new?start=${startStr}&end=${endStr}&allDay=${allDay}`);
	};

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`calendar/${id}`);
	};

	const goBack = () => history.push('/calendar');

	const header =  {
		left: 'today',
		center: 'prev,title,next',
		right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
	},

	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent 
					events={[...events].filter((e) => e.type === 0)}
					header={header}
					view='dayGridMonth'
					selectDates={selectDates}
					eventClick={eventClick} 
					goBack={goBack}
				/>
			</Paper>
		</Container>
	)
}
