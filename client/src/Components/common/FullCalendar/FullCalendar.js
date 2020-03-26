
import React, { createRef, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Container } from '@material-ui/core';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import AppContext from '../../../utils/AppContext';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent() {
	const { user: { events }} = useContext(AppContext);
	const calendarComponentRef = createRef();

	const history = useHistory();

	const calendarSettings = {
		calendarWeekends: true,
		droppable: true,
		editable: true,
	}
	const selectDates = ({ allDay, endStr, startStr}) => {
		history.push(`/events/new?start=${startStr}&end=${endStr}&allDay=${allDay}`);
	};

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`events/${id}`);
	}
	
	return (
		<Container>
			<FullCalendar 
				header={{
					left: 'today',
					center: 'prev,title,next',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				}}
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
				ref={ calendarComponentRef }
				weekends={ calendarSettings.calendarWeekends }
				events={ events }
				navLinks={true}
				eventLimit={true}
				selectable={true}
				// editable={true}
				select= {selectDates}
				eventClick={eventClick}
			/>
		</Container>
	);
}
