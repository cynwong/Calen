
import React, { createRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';

// import AppContext from '../../../utils/AppContext';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent({events, header, view, customButtons, eventOrder,selectDates, eventClick}) {
	const calendarComponentRef = createRef();
	return (
		<>
			<FullCalendar 
				header={header}
				defaultView={view}
				buttonText={{
					listDay: "Agenda",
				}}
				aspectRatio={2}
				// titleFormat='D MMM YYYY'
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, momentPlugin ]}
				ref={ calendarComponentRef }
				eventOrder={eventOrder ? eventOrder : "start,-duration,allDay,title"}
				events={ events }
				customButtons={customButtons}
				navLinks={true}
				eventLimit={true}
				selectable={true}
				height='auto'
				select= {selectDates}
				eventClick={eventClick}
			/>
		</>
	);
}
