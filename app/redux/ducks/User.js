// constrain
const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_LOCAL_PREFERENCES = 'SET_LOCAL_PREFERENCES';

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

// set local preferences
export const setLocalPreferences = (userPrefs) => {
	return {
		type: SET_LOCAL_PREFERENCES,
		payload: {
			prefs: userPrefs,
		},
	};
};

// reducers
const INITIAL_VALUE = {
	loginStatus: 'NOT_LOGGED',
	emailUserRecovery: null,
	preferences: {
		theme: 'default',
	},
};

const User = (state = INITIAL_VALUE, action) => {
	switch (action.type) {
		case SET_LOCAL_PREFERENCES:
			return {
				...state,
				preferences: action.payload.prefs,
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
