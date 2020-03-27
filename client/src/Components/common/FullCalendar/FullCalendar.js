
import React, { createRef } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';

// import AppContext from '../../../utils/AppContext';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent({eventClick, selectDates, leftHeader, rightHeader, events}) {
	const calendarComponentRef = createRef();
	return (
		<>
			<FullCalendar 
				header={{
					left: leftHeader,
					center: 'prev,title,next',
					right: rightHeader
				}}
				// titleFormat='D MMM YYYY'
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, momentPlugin ]}
				ref={ calendarComponentRef }
				events={ events }
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
