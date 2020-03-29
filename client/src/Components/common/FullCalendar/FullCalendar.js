
import React, { createRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';

// import AppContext from '../../../utils/AppContext';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent(props) {
	const {
		events,
		header,
		view,
		navLink,
		eventLimit,
		customButtons,
		eventOrder,
		selectDates,
		eventClick,
		dateClick
	} = props;
	const calendarComponentRef = createRef();
	return (
		<>
			<FullCalendar 
				header={header}
				defaultView={view}
				buttonText={{
					listDay: "Agenda",
				}}
				// titleFormat='D MMM YYYY'
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, momentPlugin ]}
				ref={ calendarComponentRef }
				eventOrder={eventOrder ? eventOrder : "start,-duration,allDay,title"}
				events={ events }
				customButtons={customButtons}
				navLinks={navLink !== undefined ? navLink : true}
				eventLimit={eventLimit !== undefined ? eventLimit : true}
				selectable={true}
				height='auto'
				select= {selectDates}
				eventClick={eventClick}
				dateClick={dateClick}
			/>
		</>
	);
}
