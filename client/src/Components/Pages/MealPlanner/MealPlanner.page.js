import React, { useContext, lazy, Suspense } from 'react';

import { useHistory } from 'react-router-dom';

import { Container, Paper } from '@material-ui/core';
import AppContext from '../../../utils/AppContext'

// import FullCalendarComponent from '../../common/FullCalendar/FullCalendar';
const FullCalendarComponent = lazy(() => import('../../common/FullCalendar/FullCalendar'));


export default function MealPlannerPage() {
	const { classes, user: { events } } = useContext(AppContext);

	const history = useHistory();

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`mealplanner/${id}`);
	};
	
	const header =  {
		left: 'today,addNew',
		center: 'prev,title,next',
		right: 'dayGridDay,dayGridWeek'
	};

	const customButtons = {
		addNew: {
			text: 'Add New',
			click: () => history.push(`/mealplanner/new?start=${new Date()}&end=&allDay=true`)
		}
	};

	return (
		<Suspense fallback={<h1>Still Loading…</h1>}>
			<Container className={classes.container}>
				<Paper className={classes.bigPaper}>
					<FullCalendarComponent 
						events={[...events].filter((e) => e.type === 0)}
						header={header}
						view='dayGridDay'
						eventOrder='end,title'
						customButtons={customButtons}
						eventClick={eventClick}
					/>
				</Paper>
			</Container>
		</Suspense>
	);
}
