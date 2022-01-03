// constrain
const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';

// action
export const actSetLogin = () => {
	return {
		type: SET_LOGIN,
	};
};

export const actSetLogout = () => {
	return {
		type: SET_LOGOUT,
	};
};

// reducers
const INITIAL_VALUE = {
	loginStatus: 'NOT_LOGGED',
	emailUserRecovery: null,
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
