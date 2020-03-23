import React, { useState, useContext } from 'react';


import FullCalendarComponent from './FullCalendar/FullCalendar';
// import BigCalendar from './BigCalendar/BigCalendar';


// utils
import AppContext from '../../../utils/AppContext';

// Styles
import './DashBoard.styles.scss';

export default function DashBoard() {
	const { user: { events: userEvents }} = useContext(AppContext);

	const [events, setEvents] = useState(userEvents); //TODO get from server

	// const handleSelect = ({start, end}) => {
	// 	console.log(start, end);
	// 	// const title = window.prompt('New Event name')
	// 	// if (title){
	// 	// 	setEvents([
	// 	// 		...events,
	// 	// 		{
	// 	// 			start,
	// 	// 			end,
	// 	// 			title,
	// 	// 		},
	// 	// 	]);
	// 	// }
	// };

	// const handleEventClick = (info) => {
	// 	console.log('event click', info)
	// 	console.log(info);
	// };

	return (
		<div className='calendar-container'>
			{/* <BigCalendar
				events={events}
				handleSelect={handleSelect}
				handleEventClick={handleEventClick}
			/> */}
			<FullCalendarComponent events={events} />
		</div>
	)
}
