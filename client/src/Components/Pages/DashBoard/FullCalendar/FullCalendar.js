
import React, { createRef, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import moment from 'moment';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import AppContext from '../../../../utils/AppContext';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent() {
	const { user: { events }} = useContext(AppContext);
	const calendarComponentRef = createRef();

	const dateFormatString = "YYYY-MM-DDThh:mm";
	const history = useHistory();

	const calendarSettings = {
		calendarWeekends: true,
		droppable: true,
		editable: true,
	}
	const selectDates = ({ allDay, endStr, startStr}) => {
		const start = moment(startStr).format(dateFormatString);
		const end = moment(endStr).format(dateFormatString);
		history.push(`/events/new?start=${start}&end=${end}&allDay=${allDay}`);
	};

	const eventClick = ({event}) => {
		const {id} = event;
		history.push(`events/${id}`);
	}
	
	return (
		<div className='full-calendar-container'>
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
		</div>
	);
}
