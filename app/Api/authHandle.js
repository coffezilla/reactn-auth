import axios from 'axios';

import { END_POINT_BASE } from './Api';

// localstorage
import {
	readItemFromStorage,
	writeItemToStorage,
	clearAllFromStorage,
} from '../helpers/handleStorage';

// GET
// get new token for rest authenticated
// can create token with or without email login
export const getAuth = async (emailUser = 'NOT_LOGGED') => {
	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('auth_email', emailUser);

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
	let userAuthToken = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
	});

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('email', userEmail);
	formData.append('password', userPassword);

	const END_POINT = END_POINT_BASE + '/auth/login';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			console.log('loogggeed', response);
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
export const checkAuth = async () => {
	let userAuthToken = null;
	let userAuthEmail = null;
	let userAuthTimestamp = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
		userAuthEmail = responseStorage.auth.email;
		userAuthTimestamp = responseStorage.auth.timestamp;
	});

	// console.log(
	// 	'asdfkjaksdfjaksjdfkajsfd',
	// 	userAuthToken,
	// 	userAuthEmail,
	// 	userAuthTimestamp
	// );

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('auth_email', userAuthEmail);
	formData.append('auth_timestamp', userAuthTimestamp);

	const END_POINT = END_POINT_BASE + '/auth/check-auth';
	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			console.log('escrito', response.data);
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

// signup
export const submitSignupUser = async (form) => {
	let userAuthToken = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
	});

	let serverResponse = { data: { status: 0 } };

	let formData = new FormData();
	formData.append('email', form.email);
	formData.append('password', form.password);
	formData.append('name', form.name);

	const END_POINT = END_POINT_BASE + '/auth/signup';
	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						auth: {
							token: response.data.token,
							timestamp: response.data.timestamp,
							email: form.email,
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

// delete account
// GET
// login
export const submitDeleteUser = async (userEmail, userPassword) => {
	let userAuthToken = null;
	let userAuthTimestamp = null;
	let userAuthEmail = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
		userAuthEmail = responseStorage.auth.email;
		userAuthTimestamp = responseStorage.auth.timestamp;
	});

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('auth_timestamp', userAuthTimestamp);
	formData.append('auth_email', userAuthEmail);
	formData.append('email', userEmail);
	formData.append('password', userPassword);

	const END_POINT = END_POINT_BASE + '/auth/delete-user';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			console.log('cabeine do tempo', response.data);
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
// start forgot password
export const submitStartForgotPasswordUser = async (userEmail) => {
	let userAuthToken = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
	});

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('email', userEmail);

	const END_POINT = END_POINT_BASE + '/auth/forgot-password';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			// console.log('mass effec', response.data);
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
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
// check pin to confirm set new password
export const checkPinChangePassword = async (userPin, userEmail) => {
	let userAuthToken = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
	});

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('pin', userPin);
	formData.append('email', userEmail);

	const END_POINT = END_POINT_BASE + '/auth/pin-check';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			console.log('PIN CHECK ', response.data);
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
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
// check current password
export const checkCurrentPassword = async (userPassword) => {
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
	formData.append('auth_timestamp', userAuthTimestamp);
	formData.append('auth_email', userAuthEmail);
	formData.append('password', userPassword);

	const END_POINT = END_POINT_BASE + '/auth/password-check';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			console.log('PIN CHECK ', response.data);
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
						email: response.data.email,
						pin: response.data.pin,
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
// set new password
export const submitNewPasswordUser = async (
	userPin,
	userEmail,
	userPassword,
	passwordConfirm
) => {
	let userAuthToken = null;
	await readItemFromStorage().then((responseStorage) => {
		userAuthToken = responseStorage.auth.token;
	});

	let serverResponse = { data: { status: 0 } };
	let formData = new FormData();
	formData.append('pin', userPin);
	formData.append('email', userEmail);
	formData.append('password', userPassword);
	formData.append('passwordConfirm', passwordConfirm);

	const END_POINT = END_POINT_BASE + '/auth/set-new-password';

	await axios({
		method: 'post',
		url: END_POINT,
		data: formData,
		headers: { Authorization: `Bearer ${userAuthToken}` },
	})
		.then((response) => {
			console.log('PIN CHECK ', response.data);
			if (response.data.status === 1) {
				serverResponse = {
					data: {
						status: response.data.status,
						message: response.data.message,
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
