// constrain
const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';

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

// reducers
const INITIAL_VALUE = {
	loginStatus: 'NOT_LOGGED',
};

const User = (state = INITIAL_VALUE, action) => {
	switch (action.type) {
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
