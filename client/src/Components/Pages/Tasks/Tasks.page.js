import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Paper } from '@material-ui/core';

import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';

import AppContext from '../../../utils/AppContext'

export default function CalendarPage() {
	const { classes, user: { events } } = useContext(AppContext);

	const history = useHistory();

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`tasks/${id}`);
	};
	
	const header =  {
		left: 'today,addNew',
		center: 'prev,title,next',
		right: 'listDay,listWeek'
	};

	const customButtons = {
		addNew: {
			text: 'Add New Task',
			click: () => history.push(`/tasks/new?start=${new Date()}&end=&allDay=true`)
		}
	};

	return (
		<Container className={classes.container}>
			<Paper className={classes.bigPaper}>
				<FullCalendarComponent 
					events={[...events].filter((e) => e.type === 0)}
					header={header}
					view='listDay'
					eventOrder='end,title'
					customButtons={customButtons}
					eventClick={eventClick}
				/>
			</Paper>
		</Container>
	);
}
