
import React, { createRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent({events}) {

	const calendarComponentRef = createRef();
	const [currentView, setCurrentView] = useState("dayGridMonth");
	// const [officeHoursButtonLabel, setOfficeHoursButtonLabel] = useState('Show office hours only');

	const calendarSettings = {
		calendarWeekends: true,
		droppable: true,
		editable: true,
		events,
		headerLeft: 'today,showOfficeHoursOnly',
		minTime: "09:00:00",
		maxTime: "18:00:00",
		// showOfficeHoursOnly: false,
		// showOfficeHoursOnlyButtonLabel: officeHoursButtonLabel
	}
	const handleEventPositioned = (info) => {
		info.el.setAttribute("data-tip","some text tip");
		ReactTooltip.rebuild();
	};
	const selectDates = (info) => {
		const { allDay, endStr, startStr} = info;
		console.log('selected ' + info.startStr + ' to ' + info.endStr);
		console.log(info);
		
	};
	const clickDate = (info) => {
		console.log('date clicked>>>>')
		console.log(info)
	};
	const eventDrop = (info) => {
		const { event: {
			id, 
			start,
			end, 
			title, 
			url
		}} = info;
		console.log('event drop', info, {id, start, end, title, url});
	};
	const eventResizeStop = (info) => {
		console.log('event resize stop', info);
	};
	
	return (
		<div className='full-calendar-container'>
			<FullCalendar 
				defaultView={currentView}
				header={{
					left: calendarSettings.headerLeft,
					center: 'prev,title,next',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				}}
				// customButtons={{
				// 	showOfficeHoursOnly: {
				// 		text: calendarSettings.showOfficeHoursOnlyButtonLabel,
				// 		click: function() {
				// 			setOfficeHoursButtonLabel
				// 			setCalendarSettings({
				// 				...calendarSettings,
				// 				showOfficeHoursOnlyButtonLabel: calendarSettings.showOfficeHoursOnly ? 'Show office hours only' : 'Show all hours',
				// 				showOfficeHoursOnly: !calendarSettings.showOfficeHoursOnly
				// 			})
				// 		}
				// 	}
				// }}
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
				ref={ calendarComponentRef }
				weekends={ calendarSettings.calendarWeekends }
				events={ calendarSettings.events }
				eventLimit={true}
				selectable={true}
				editable={true}
				minTime={calendarSettings.showOfficeHoursOnly ? calendarSettings.minTime: "00:00:00"}
				maxTime={calendarSettings.showOfficeHoursOnly ? calendarSettings.maxTime: "24:00:00"}
				eventDrop={eventDrop}
				eventResizeStop={eventResizeStop}
				select= {selectDates}
				clickDate={clickDate}
				eventPositioned={handleEventPositioned}
			/>
		</div>
	)
}
