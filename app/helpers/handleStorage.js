import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL_STORAGE_STORE } from './Constrains';

export const writeItemToStorage = async (value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(LOCAL_STORAGE_STORE, jsonValue);
		return jsonValue;
	} catch (e) {
		return e;
	}
};

export const readItemFromStorage = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_STORE);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		return e;
		// error reading value
	}
};

export const clearAllFromStorage = async () => {
	console.log('clear storage');
	try {
		await AsyncStorage.clear();
	} catch (e) {
		// clear error
	}
};
