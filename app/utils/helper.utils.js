export const isEmailValid = (email) => {
	const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(regexp)) return {isValid: true, message: 'Success'};
	return {isValid: false, message: 'INVALID_EMAIL_FORMAT'};
};

export const isFullNameValid = (fullName) => {
	if (fullName.trim().length < 3) return {isValid: false, message: 'INVALID_MINIMUM_FULL_NAME_LENGTH'};
	const regexp = /^[a-zA-Z ]*$/
	if (!regexp.test(fullName)) return {isValid: false, message: 'INVALID_FULL_NAME_FORMAT'};
	return {isValid: true, message: 'Success'};
};

export const isGroupNameValid = (groupName) => {
	if (groupName.trim().length < 3) return {isValid: false, message: 'INVALID_MINIMUM_GROUP_NAME_LENGTH'};
	const regexp = /^[a-zA-Z ]*$/
	if (!regexp.test(groupName)) return {isValid: false, message: 'INVALID_FULL_GROUP_FORMAT'};
	return {isValid: true, message: 'Success'};
};

export const isUsernameValid = (username) => {
    if (username.trim().length < 6) return {isValid: false, message: 'INVALID_MINIMUM_USERNAME_LENGTH'};
    if (username.trim().length > 20) return {isValid: false, message: 'INVALID_MAXIMUM_USERNAME_LENGTH'};
    const regexp = /^[a-zA-Z0-9]*$/
    if (!regexp.test(username)) return {isValid: false, message: 'INVALID_USERNAME_FORMAT'};
    return {isValid: true, message: 'Success'};
};

export const isPasswordValid = (password) => {
	if (password.length < 8) return {isValid: false, message: 'INVALID_MINIMUM_PASSWORD_LENGTH'};
	if (password.length > 64) return {isValid: false, message: 'INVALID_MAXIMUM_PASSWORD_LENGTH'};
	const lowerCaseRegExp = /[a-z]/;
	if (!lowerCaseRegExp.test(password)) return {isValid: false, message: 'INVALID_LOWER_CASE'};
	const upperCaseRegExp = /[A-Z]/;
	if (!upperCaseRegExp.test(password)) return {isValid: false, message: 'INVALID_UPPER_CASE'};
	const numericCaseRegExp = /\d/;
	if (!numericCaseRegExp.test(password)) return {isValid: false, message: 'INVALID_NUMERIC_CHARACTER'};
	const specialCharCaseRegExp = /[*@!#%&()^~{}]+/;
	if (!specialCharCaseRegExp.test(password)) return {isValid: false, message: 'INVALID_SPECIAL_CHARACTER'};
	return {isValid: true, message: 'Success'};
};

export const isConfirmPasswordMatch = (password, confirmPassword) => {
	if (password === confirmPassword) return {isValid: true, message: 'Success'};
	return {isValid: false, message: 'INVALID_NOT_MATCH'};
};

export const isNewPasswordValid = (currentPassword, newPassword) => {
	// if(currentPassword === newPassword) return {isValid: false, message: 'INVALID_SAME_'};
	return {isValid: true, message: 'Success'};
};

export const padArray = (array, length, fill) => {
	return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array;
};

export const leftPadArray = (array, length, fill) => {
	return Array(length).fill(fill).concat(array).slice(array.length);
};

export const rupiahFormatting = (value, withRp = true) => {
	// https://www.malasngoding.com/membuat-format-rupiah-dengan-javascript/
	
	var number_string = value.toString().replace(/[^,\d]/g, '').toString(),
	split = number_string.split(','),
	sisa = split[0].length % 3,
	rupiah = split[0].substr(0, sisa),
	ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return rupiah ? (withRp ? `Rp ${rupiah}` : rupiah) : '';
};