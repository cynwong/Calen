import { createContext } from 'react';

const AppContext = createContext({
	currentEvent: {},
	user: {},
	createNewEvent: (start, end, allDay) => undefined,
	fnLogin: (username, password) => undefined,
	fnLogOut: () => undefined,
})

export default AppContext;