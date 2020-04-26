export const isEmailValid = (email) => {
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexp)) return {isValid: true, message: 'Success'};
    return {isValid: false, message: 'INVALID_EMAIL_FORMAT'};
}

export const isFullNameValid = (fullName) => {
    if (fullName.trim().length < 3) return {isValid: false, message: 'INVALID_MINIMUM_FULL_NAME_LENGTH'};
    const regexp = /[a-zA-Z ]$/
    if (!regexp.test(fullName)) return {isValid: false, message: 'INVALID_FULL_NAME_FORMAT'};
    return {isValid: true, message: 'Success'};
}

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
}

export const isConfirmPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) return {isValid: true, message: 'Success'};
    return {isValid: false, message: 'INVALID_NOT_MATCH'};
}