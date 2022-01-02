import axios from 'axios';

// localstorage
import { readItemFromStorage } from '../helpers/handleStorage';

import { getAuth } from './authHandle';
import { END_POINT_BASE } from './Api';

// GET
// NEED: AUTH & CREDENTIALS OR JUST AUTH
export const getRankingData = async () => {
	let serverResponse = { data: { status: 0 } };
	let hasLocalStorageAuth = false;
	let localStorageAuth = {};

	// check token auth
	await readItemFromStorage().then((res) => {
		if (res !== null) {
			if (
				res.auth?.timestamp !== undefined &&
				res.auth?.email !== undefined &&
				res.auth?.token
			) {
				hasLocalStorageAuth = true;
				localStorageAuth = res.auth;
			}
		}
	});

	// renew token if is missing
	if (!hasLocalStorageAuth) {
		await getAuth().then((resAuth) => {
			if (resAuth.data.status === 1) {
				hasLocalStorageAuth = true;
				localStorageAuth = resAuth.data;
			}
		});
	}

	if (hasLocalStorageAuth) {
		const END_POINT = END_POINT_BASE + '/game/ranking';
		await axios({
			method: 'get',
			url: END_POINT,
			headers: { Authorization: `Bearer ${localStorageAuth.token}` },
		})
			.then((response) => {
				// console.log('rankin', response.data);
				if (response.data.status === 1) {
					serverResponse = {
						data: {
							status: response.data.status,
							ranking: response.data.ranking,
						},
					};
				}
			})
			.catch((error) => {});
	}
	return serverResponse;
};

// GET
// NEED: AUTH & CREDENTIALS OR JUST AUTH
export const getTeamsData = async () => {
	let serverResponse = { data: { status: 0 } };
	let hasLocalStorageAuth = false;
	let localStorageAuth = {};

	// check token auth
	await readItemFromStorage().then((res) => {
		if (res !== null) {
			if (
				res.auth?.timestamp !== undefined &&
				res.auth?.email !== undefined &&
				res.auth?.token
			) {
				hasLocalStorageAuth = true;
				localStorageAuth = res.auth;
			}
		}
	});

	// renew token if is missing
	if (!hasLocalStorageAuth) {
		await getAuth().then((resAuth) => {
			if (resAuth.data.status === 1) {
				hasLocalStorageAuth = true;
				localStorageAuth = resAuth.data;
			}
		});
	}

	if (hasLocalStorageAuth) {
		const END_POINT = END_POINT_BASE + '/game/teams';
		await axios({
			method: 'get',
			url: END_POINT,
			headers: { Authorization: `Bearer ${localStorageAuth.token}` },
		})
			.then((response) => {
				// console.log('COUNTRIES', response.data);
				if (response.data.status === 1) {
					serverResponse = {
						data: {
							status: response.data.status,
							countries: response.data.countries,
						},
					};
				}
			})
			.catch((error) => {});
	}
	return serverResponse;
};

// GET
// NEED: AUTH & CREDENTIALS OR JUST AUTH
export const getFixtures = async () => {
	let serverResponse = { data: { status: 0 } };
	let hasLocalStorageAuth = false;
	let localStorageAuth = {};

	// check token auth
	await readItemFromStorage().then((res) => {
		if (res !== null) {
			if (
				res.auth?.timestamp !== undefined &&
				res.auth?.email !== undefined &&
				res.auth?.token
			) {
				hasLocalStorageAuth = true;
				localStorageAuth = res.auth;
			}
		}
	});

	// renew token if is missing
	if (!hasLocalStorageAuth) {
		await getAuth().then((resAuth) => {
			if (resAuth.data.status === 1) {
				hasLocalStorageAuth = true;
				localStorageAuth = resAuth.data;
			}
		});
	}

	if (hasLocalStorageAuth) {
		const END_POINT = END_POINT_BASE + '/game/fixtures';
		await axios({
			method: 'get',
			url: END_POINT,
			headers: { Authorization: `Bearer ${localStorageAuth.token}` },
		})
			.then((response) => {
				// console.log('fixture', response.data);
				if (response.data.status === 1) {
					serverResponse = {
						data: {
							status: response.data.status,
							fixtures: response.data.fixtures,
						},
					};
				}
			})
			.catch((error) => {});
	}
	return serverResponse;
};

// GET
// NEED: AUTH & CREDENTIALS OR JUST AUTH
export const getlastMatchesData = async () => {
	let serverResponse = { data: { status: 0 } };
	let hasLocalStorageAuth = false;
	let localStorageAuth = {};
	const today = new Date();
	const currentTime =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	// check token auth
	await readItemFromStorage().then((res) => {
		if (res !== null) {
			if (
				res.auth?.timestamp !== undefined &&
				res.auth?.email !== undefined &&
				res.auth?.token
			) {
				hasLocalStorageAuth = true;
				localStorageAuth = res.auth;
			}
		}
	});

	// renew token if is missing
	if (!hasLocalStorageAuth) {
		await getAuth().then((resAuth) => {
			if (resAuth.data.status === 1) {
				hasLocalStorageAuth = true;
				localStorageAuth = resAuth.data;
			}
		});
	}

	if (hasLocalStorageAuth) {
		const END_POINT = END_POINT_BASE + '/game/last-matches';

		await axios({
			method: 'get',
			url: END_POINT,
			headers: { Authorization: `Bearer ${localStorageAuth.token}` },
		})
			.then((response) => {
				// console.log(response.data);
				if (response.data.status === 1) {
					serverResponse = {
						data: {
							status: response.data.status,
							lastMatches: response.data.lastMatches,
							timeLastUpdate: currentTime,
						},
					};
				}
			})
			.catch((error) => {});
	}
	return serverResponse;
};

// GET
// NEED: AUTH & CREDENTIALS OR JUST AUTH
export const getTeamDetailData = async (teamId) => {
	let serverResponse = { data: { status: 0 } };
	let hasLocalStorageAuth = false;
	let localStorageAuth = {};

	// check token auth
	await readItemFromStorage().then((res) => {
		if (res !== null) {
			if (
				res.auth?.timestamp !== undefined &&
				res.auth?.email !== undefined &&
				res.auth?.token
			) {
				hasLocalStorageAuth = true;
				localStorageAuth = res.auth;
			}
		}
	});

	// renew token if is missing
	if (!hasLocalStorageAuth) {
		await getAuth().then((resAuth) => {
			if (resAuth.data.status === 1) {
				hasLocalStorageAuth = true;
				localStorageAuth = resAuth.data;
			}
		});
	}

	if (hasLocalStorageAuth) {
		const END_POINT = END_POINT_BASE + '/game/team/' + teamId;
		await axios({
			method: 'get',
			url: END_POINT,
			headers: { Authorization: `Bearer ${localStorageAuth.token}` },
		})
			.then((response) => {
				if (response.data.status === 1) {
					serverResponse = {
						data: {
							status: response.data.status,
							team: response.data.team,
						},
					};
				}
			})
			.catch((error) => {});
	}
	return serverResponse;
};

// GET
// NEED: AUTH & CREDENTIALS OR JUST AUTH
export const getFixtureDetailData = async (fixtureId, seasonId) => {
	let serverResponse = { data: { status: 0 } };
	let hasLocalStorageAuth = false;
	let localStorageAuth = {};

	// check token auth
	await readItemFromStorage().then((res) => {
		if (res !== null) {
			if (
				res.auth?.timestamp !== undefined &&
				res.auth?.email !== undefined &&
				res.auth?.token
			) {
				hasLocalStorageAuth = true;
				localStorageAuth = res.auth;
			}
		}
	});

	// renew token if is missing
	if (!hasLocalStorageAuth) {
		await getAuth().then((resAuth) => {
			if (resAuth.data.status === 1) {
				hasLocalStorageAuth = true;
				localStorageAuth = resAuth.data;
			}
		});
	}

	if (hasLocalStorageAuth) {
		const END_POINT =
			END_POINT_BASE + '/game/fixture/' + fixtureId + '/' + seasonId;
		await axios({
			method: 'get',
			url: END_POINT,
			headers: { Authorization: `Bearer ${localStorageAuth.token}` },
		})
			.then((response) => {
				// console.log('man', typeof response.data.fixtures);
				if (response.data.status === 1) {
					serverResponse = {
						data: {
							status: response.data.status,
							fixtures: response.data.fixtures,
						},
					};
				}
			})
			.catch((error) => {});
	}
	return serverResponse;
};
