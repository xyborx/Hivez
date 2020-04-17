import AsyncStorage from '@react-native-community/async-storage';
import objectMap from './helper.utils';

const keys = {};

const set = async (storageKey, data) => {
	try {
		await AsyncStorage.setItem(storageKey, data);
	} catch (e) {
		console.log(e);
	}
};

const get = async (storageKey) => {
	try {
		const value = await AsyncStorage.getItem(storageKey);
		return value;
	} catch (e) {
		console.log(e);
		return {};
	}
};

const clear = async () => {
	try {
		for (var key in keys) {
			if (keys.hasOwnProperty(key)) {
				await AsyncStorage.removeItem(keys[key]);
			}
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	keys,
	set,
	get,
	clear
};