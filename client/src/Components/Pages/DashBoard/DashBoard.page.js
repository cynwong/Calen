import React from 'react';

import FullCalendarComponent from './FullCalendar/FullCalendar';

// Styles
import './DashBoard.styles.scss';

export default function DashBoard() {

	return (
		<div className='calendar-container'>
			<FullCalendarComponent />
		</div>
	)
}
