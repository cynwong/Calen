import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext';

export default function Diary() {
	const { classes, user: { events }} = useContext(AppContext);

	const history = useHistory();

	const selectDates = ({startStr}) => {
		// search if there is already an entry
		const start = moment(startStr).startOf('day');
		const event = events.filter((e) => moment(e.start).isSame(start))[0];
		if(event && 'id' in event) {
			return eventClick({event})
		}
		// if not, create a new one. 
		history.push(`/dairyentries/new?start=${startStr}&allDay=true`);
	};

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`dairyentries/${id}`);
	};
	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent events={events.filter((event) => (event.type === 1))} selectDates={selectDates} eventClick={eventClick} />
			</Paper>
		</Container>
	)
}
