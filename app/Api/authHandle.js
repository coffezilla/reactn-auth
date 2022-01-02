import axios from 'axios';

import { END_POINT_BASE } from './Api';

// GET
// get new token for rest authenticated
// can create token with or without email login
export const getAuth = async (emailUser = 'NOT_LOGGED') => {
	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('email', emailUser);

	const END_POINT = END_POINT_BASE + '/auth/get-auth';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
	})
		.then((response) => {
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						auth: {
							token: response.data.token,
							timestamp: response.data.timestamp,
							email: response.data.email,
						},
					},
				};
			} else {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
					},
				};
			}
		})
		.catch((error) => {
			serverResponse = {
				data: {
					status: 2,
					message: 'server error, try again!',
				},
			};
		});

	return serverResponse;
};

// GET
// login
export const submitLoginUser = async (userEmail, userPassword) => {
	console.log('login');
	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('email', userEmail);
	formData.append('password', userPassword);

	const END_POINT = END_POINT_BASE + '/auth/login';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
	})
		.then((response) => {
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						auth: {
							token: response.data.token,
							timestamp: response.data.timestamp,
							email: userEmail,
						},
					},
				};
			} else {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
					},
				};
			}
		})
		.catch((error) => {
			console.log(error);
			serverResponse = {
				data: {
					status: 2,
					message: 'server error, try again!',
				},
			};
		});

	return serverResponse;
};

//
export const submitLogoutUser = async () => {
	let serverResponse = {
		data: {
			status: 1,
		},
	};
	// clear localStorage
	return serverResponse;
};

// POST
// NEED: NOTHING
export const checkAuth = async (userEmail, userToken, timestamp) => {
	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('email', userEmail);
	formData.append('timestamp', timestamp);

	const END_POINT = END_POINT_BASE + '/auth/check-auth';
	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userToken}` },
	})
		.then((response) => {
			console.log('voga', response.data);
			// 1 - done
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
					},
				};
			} else {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
					},
				};
			}
		})
		.catch((error) => {});

	return serverResponse;
};
