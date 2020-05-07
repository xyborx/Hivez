import moment from "moment";

export const currentDate = moment();

export const isToday = (date) => {
	return moment(date).isSame(currentDate.clone().startOf('day'), 'day');
};

export const isBetweenLastWeek = (date) => {
	return moment(date).isBetween(currentDate.clone().startOf('day').subtract(7, 'days'), moment());
};

export const isBetweenLastMonth = (date) => {
	return moment(date).isSame(currentDate.clone().startOf('day'), 'month');
};

export const getRelativeDate = (date) => {
	return moment(date).fromNow();
};

export const createDate = (date) => {
	return moment(date);
};

export const dateToString = (date, isShortDate) => {
	return isShortDate ? moment(date).format('D MMMM YYYY') :
		moment(date).format('dddd, D MMMM YYYY');
};

export const timeToString = (date) => {
	return moment(date).format('HH:mm');
};

export const isAfterCurrent = (date) => {
	return moment(date).isAfter(currentDate.clone());
};

export const getDay = (date) => {
	return moment(date).format('DD');
};

export const getWeekDay = (date) => {
	return moment(date).format('dddd');
};

export const getMonthYear = (date) => {
	return moment(date).format('MMMM YYYY');
};