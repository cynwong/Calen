import axios from 'axios';

export default {
	//User
	postSignUp: (postData) => {
		return axios.post(
			'/api/signup',
			postData
		);
	},
	login: (username, password) => {
		return axios.post(
			'/api/login',
			{ username, password }
		);
	},
	logOut: () => {
		return axios.get(
			'/api/logout',
		);
	},
	// Event
	getEvent: (id) => {
		return axios.get(
			`/api/events/${id}`,
		);
	},
	postNewEvent: (data) => {
		return axios.post(
			'/api/events',
			data
		);
	},
}