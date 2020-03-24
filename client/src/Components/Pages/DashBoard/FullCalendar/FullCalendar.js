
import React, { createRef, useState, useContext } from 'react';
import moment from 'moment';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import TransitionsModal from '../../../common/TransitionModal/TransitionModal';

import AppContext from '../../../../utils/AppContext';

import './FullCalendar.styles.scss';

export default function FullCalendarComponent() {
	const { user: { events }} = useContext(AppContext);
	const [modalData, setModalData] = useState({
		open: false,
		event: {}
	});
	const calendarComponentRef = createRef();

	const dateFormatString = "YYYY-MM-DDThh:mm";

	const calendarSettings = {
		calendarWeekends: true,
		droppable: true,
		editable: true,
	}
	const selectDates = (info) => {
		const { allDay, endStr, startStr} = info;
		setModalData({
			open: true,
			event: {
				allDay,
				start: moment(startStr).format(dateFormatString),
				end: moment(endStr).format(dateFormatString),
			}
		});
	};

	const closeModal = () => setModalData({open: false, event: {}});
	const clickDate = (info) => {
		console.log('date clicked>>>>')
		console.log(info)
	};
	
	return (
		<div className='full-calendar-container'>
			{
				modalData.open ? (
					<TransitionsModal open={modalData.open} event={modalData.event} closeModal={closeModal} />
				) : (
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
						editable={true}
						select= {selectDates}
						clickDate={clickDate}
					/>
				)
			}
			
		</div>
	)
}
