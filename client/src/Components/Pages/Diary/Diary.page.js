import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext';

export default function Diary() {
	const { classes, user: { dairyEntries } } = useContext(AppContext);

	const history = useHistory();

	const selectDates = ({ startStr }) => {
		history.push(`/dairyentries/new?start=${startStr}&allDay=true`);
	};

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`dairyentries/${id}`);
	};
	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent events={dairyEntries} selectDates={selectDates} eventClick={eventClick} />
			</Paper>
		</Container>
	)
}
