import axios from 'axios';

export default {
	//User
	forgotPassword: (email) => {
		return axios.patch(
			`/api/forgotpassword`,
			{email}
		);
	},
	isLogin: () => {
		return axios.get(
			'/api/getlogin',
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
	postSignUp: (postData) => {
		return axios.post(
			'/api/signup',
			postData
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