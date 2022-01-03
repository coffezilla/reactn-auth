// constrain
const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_EMAIL_RECOVERY = 'SET_EMAIL_RECOVERY';

// action
export const actSetLogin = () => {
	console.log('--------- LOGIN');
	return {
		type: SET_LOGIN,
	};
};

export const actSetLogout = () => {
	console.log('--------- logout');
	return {
		type: SET_LOGOUT,
	};
};

// save temporally the email used for recovery
export const setEmailRecovery = (email) => {
	console.log('--------- setEmail recovery');
	return {
		type: SET_LOGOUT,
		payload: {
			email,
		},
	};
};

// reducers
const INITIAL_VALUE = {
	loginStatus: 'NOT_LOGGED',
	emailUserRecovery: null,
};

const User = (state = INITIAL_VALUE, action) => {
	switch (action.type) {
		case SET_EMAIL_RECOVERY:
			return {
				...state,
				emailUserRecovery: action.payload.email,
			};
		case SET_LOGIN:
			return {
				...state,
				loginStatus: 'LOGGED',
			};
		case SET_LOGOUT:
			return {
				...state,
				loginStatus: 'NOT_LOGGED',
			};
		default: {
			return state;
		}
	}
};

export default User;
