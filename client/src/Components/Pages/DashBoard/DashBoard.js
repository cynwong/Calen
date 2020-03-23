
import React, { createRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import './styles.scss';

export default function DashBoard() {

	const calendarComponentRef = createRef();
	const [calendarSettings, setCalendarSettings] = useState({
		calendarWeekends: true,
		droppable: true,
		editable: true,
		events: [
			{ id:1, title: 'Event Now', start: '2020-03-23T14:30:00'},
			{
				id:2,
				title: 'Meeting',
				start: '2020-03-22T14:30:00',
				allDay:true,
				extendedProps: {
					status: 'done'
				},
				editable: true,
				description: 'Lecture'
			}
		], 
		handleEventPositioned:(info) => {
			info.el.setAttribute("data-tip","some text tip");
			ReactTooltip.rebuild();
		},
		selectDates: (info) => {
			const { allDay, endStr, startStr} = info;
			console.log('selected ' + info.startStr + ' to ' + info.endStr);
			console.log(info);
			
		},
		clickDate: (info) => {
			console.log('date clicked>>>>')
			console.log(info)
		},
		eventDrop: (info) => {
			const { event: {
				id, 
				start,
				end, 
				title, 
				url
			}} = info;
			console.log('event drop', info, {id, start, end, title, url});
		},
		eventResizeStop: (info) => {
			console.log('event resize stop', info);
		},
		// viewRender: (view,_element) => {
		// 	const viewType = view.view.type;
		// 	if(viewType=='dayGridMonth' || viewType=='listWeek'){
		// 		setCalendarSettings({
		// 			...calendarSettings,
		// 			headerLeft:'today'
		// 		});
		// 	}else{
		// 		setCalendarSettings({
		// 			...calendarSettings,
		// 			headerLeft:'today,showOfficeHoursOnly'
		// 		});
		// 	}
		// },
		headerLeft: 'today,showOfficeHoursOnly',
		minTime: "09:00:00",
		maxTime: "18:00:00",
		showOfficeHoursOnly: false,
		showOfficeHoursOnlyButtonLabel: 'Show office hours only'
	});
	
	return (
		<div className='full-calendar-container'>
			<FullCalendar 
				defaultView="dayGridMonth"
				header={{
					left: calendarSettings.headerLeft,
					center: 'prev,title,next',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				}}
				customButtons={{
					showOfficeHoursOnly: {
						text: calendarSettings.showOfficeHoursOnlyButtonLabel,
						click: function() {
							setCalendarSettings({
								...calendarSettings,
								showOfficeHoursOnlyButtonLabel: calendarSettings.showOfficeHoursOnly ? 'Show office hours only' : 'Show all hours',
								showOfficeHoursOnly: !calendarSettings.showOfficeHoursOnly
							})
						}
					}
				}}
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
				ref={ calendarComponentRef }
				weekends={ calendarSettings.calendarWeekends }
				events={ calendarSettings.events }
				eventLimit={true}
				selectable={true}
				editable={true}
				minTime={calendarSettings.showOfficeHoursOnly ? calendarSettings.minTime: "00:00:00"}
				maxTime={calendarSettings.showOfficeHoursOnly ? calendarSettings.maxTime: "24:00:00"}
				eventDrop={calendarSettings.eventDrop}
				eventResizeStop={calendarSettings.eventResizeStop}
				select= {calendarSettings.selectDates}
				clickDate={calendarSettings.clickDate}
				eventPositioned={calendarSettings.handleEventPositioned}
				viewSkeletonRender={calendarSettings.viewRender}
			/>
		</div>
	)
}
