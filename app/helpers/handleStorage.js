import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL_STORAGE_STORE, LOCAL_STORAGE_SUPPORT } from './Constrains';

export const writeItemToStorage = async (value) => {
	console.log('cara');
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
	}
};

// create temporary for supporting
export const writeItemToStorageSupport = async (value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(LOCAL_STORAGE_SUPPORT, jsonValue);
		return jsonValue;
	} catch (e) {
		return e;
	}
};

// handle storage support elements
export const readItemFromStorageSupport = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_SUPPORT);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		return e;
	}
};

export const clearAllFromStorage = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {}
};
