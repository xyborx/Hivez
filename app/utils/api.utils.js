import Frisbee from 'frisbee';

// create a new instance of Frisbee
const api = new Frisbee({
	baseURI: 'http://localhost:3001',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});

export const get = async(url) => {
	try {
		const result = await api.get(url);
		return result['body'];
	} catch (error) {
		console.log(error.stack);
		return null;
	}
};

export const post = async(url, body) => {
	try {
		const result = await api.post(url, {body: body});
		return result['body'];
	} catch (error) {
		console.log(error.stack);
		return null;
	}
};

export const put = async(url, body) => {
	try {
		const result = await api.put(url, {body: body});
		return result['body'];
	} catch (error) {
		console.log(error.stack);
		return null;
	}
};

export const del = async(url) => {
	try {
		const result = await api.delete(url);
		return result['body'];
	} catch (error) {
		console.log(error.stack);
		return null;
	}
};