import React, { useContext } from 'react';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext'

export default function DashBoard() {
	const { classes } = useContext(AppContext);

	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent />
			</Paper>
		</Container>
	)
}
