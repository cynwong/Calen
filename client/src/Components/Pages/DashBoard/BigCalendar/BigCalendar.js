import React, { useContext, useState } from 'react';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from 'moment';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// utils
import AppContext from '../../../../utils/AppContext';

// styles
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


const BigCalendar = () => {
	const { user: { events: userEvents }} = useContext(AppContext);

	const localizer = momentLocalizer(moment);
	const DnDCalendar = withDragAndDrop(Calendar);
	const [events, setEvents] = useState(userEvents); //TODO get from server

	const handleSelect = ({ start, end }) => {
		const title = window.prompt('New Event name')
		if (title){
			setEvents([
				...events,
				{
					start,
					end,
					title,
				},
			]);
		}
	}
	const handleEventClick = (info) => {
		console.log('event click', info)
		console.log(info);
	}

	const handleEventResize = (info) => {
		console.log('event resize', info)
	}
	const handleEventDrop = (info) => {
		console.log('event drop', info)
	}

	return (
		<DnDCalendar
			defaultDate={moment().toDate()}
			defaultView="month"
			views={Object.keys(Views).map(k => Views[k])}
			events={events}
			localizer={localizer}
			step={15}
			showMultiDayTimes={true}
			scrollToTime={new Date()}
			defaultDate={new Date()}
			defaultView={Views.WEEK}
			selectable
			popup
			onEventDrop={handleEventDrop}
			onEventResize={handleEventResize}
			onSelectEvent={handleEventClick}
			onSelectSlot={handleSelect}
			resizable
			style={{ height: "100vh" }}
        />
	);
}

export default BigCalendar;