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
}