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
	deleteEvent: (id) => {
		return axios.delete(
			`/api/events/${id}`,
		);
	},
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
	putEvent: (data) => {
		return axios.put(
			`/api/events/${data.id}`,
			data
		);
	},
}