import axios from 'axios';

import { END_POINT_BASE } from './Api';

// localstorage
import { readItemFromStorage } from '../helpers/handleStorage';

// POST
// edit user data
export const userEditData = async (userName) => {
	let userAuthToken = null;
	let userAuthEmail = null;
	let userAuthTimestamp = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
		userAuthEmail = responseStorage.auth.email;
		userAuthTimestamp = responseStorage.auth.timestamp;
	});

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('auth_email', userAuthEmail);
	formData.append('auth_timestamp', userAuthTimestamp);
	formData.append('name', userName);

	const END_POINT = END_POINT_BASE + '/user/edit';
	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
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

// GET
// get user data to edit
export const getUserData = async () => {
	let userAuthToken = null;
	let userAuthEmail = null;
	let userAuthTimestamp = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
		userAuthEmail = responseStorage.auth.email;
		userAuthTimestamp = responseStorage.auth.timestamp;
	});

	let serverResponse = { data: { status: 0 } };
	const GET_PARAMS = `?auth_email=${userAuthEmail}&auth_timestamp=${userAuthTimestamp}`;

	const END_POINT = END_POINT_BASE + '/user/get-data' + GET_PARAMS;
	await axios({
		method: 'get',
		url: END_POINT,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			// 1 - done
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						user: response.data.user,
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
