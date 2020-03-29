import React, { useContext } from 'react';
import { Redirect, useParams, useHistory } from "react-router-dom";

import AppContext from '../../../utils/AppContext';

export default function SwitchRoute() {
	const { user: {events} } = useContext(AppContext);
	const { id } = useParams();
	const history = useHistory();

	const event = events.filter((e)=> e.id === id)[0];

	switch(event.type) {
		case 0:
			history.push(`/calendar/${id}`);
			break;
		case 1:
			history.push(`/diary/${id}`);
			break;
		case 3:
			history.push(`/tasks/${id}`);
			break;
		default:
			history.push(`/404`);
			break;
		
	};
	return (<></>)
}
