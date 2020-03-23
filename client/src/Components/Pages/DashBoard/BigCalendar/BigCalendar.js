import React from 'react';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from 'moment';

// styles
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import './BigCalendar.styles.scss';

const BigCalendar = (props) => {
	const {
		events,
		handleSelect,
		handleEventClick
	} = props;

	const localizer = momentLocalizer(moment);

	return (
		<Calendar
			defaultDate={moment().toDate()}
			defaultView="month"
			views={Object.keys(Views).map(k => Views[k])}
			events={events}
			localizer={localizer}
			step={15}
			showMultiDayTimes={true}
			scrollToTime={new Date()}
			selectable
			popup
			onSelectEvent={handleEventClick}
			onSelectSlot={handleSelect}
			style={{ height: "100vh" }}
        />
	);
}

export default BigCalendar;