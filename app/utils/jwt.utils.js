import jwt_decode from 'jwt-decode';

export const decode = payload => {
	try {
		const result = jwt_decode(payload);
		return result;
	} catch (error) {
		console.log(error);
		return '';
	}
};