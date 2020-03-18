import { createContext } from 'react';

const AppContext = createContext({
	username: '',
	fullName: '',
	fnLogin: () => undefined
})

export default AppContext;