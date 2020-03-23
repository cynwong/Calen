import React, { useState } from 'react';

import './styles.scss';

import BigCalendar from './BigCalendar/BigCalendar';

export default function DashBoard() {

	return (
		<div className='calendar-container'>
			<BigCalendar />
		</div>
	)
}
