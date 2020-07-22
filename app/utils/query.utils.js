import Enumerable from "linq";
import {createDate} from './date.utils';

export const groupBy = (array, groupItem) => {
	return Enumerable.from(array).groupBy(item => item[groupItem], null, (key, g) => {return {id: key, data: g.select().toArray()}}).toArray();
};

export const groupByDay = (array, date) => {
	return Enumerable.from(array).groupBy(item => createDate(item[date]).format('YYYY-MM-DD'), null, (key, g) => {return {id: key, data: g.select().toArray()}}).toArray();
};

export const leftExcludingJoin = (leftArray, rightArray, id) => {
	return Enumerable.from(leftArray).except(rightArray).toArray();
};

export const orderByDate = (array, date, ascending = false) => {
	return ascending ? Enumerable.from(array).orderBy(item => createDate(item[date]).format()).toArray() :
	Enumerable.from(array).orderByDescending(item => createDate(item[date]).format()).toArray();
};

export const selectSpecificColumn = (array, column) => {
	return Enumerable.from(array).select(item => item[column]).toArray();
};

export const sum = (array, column) => {
	return Enumerable.from(array).sum(item => Number(item[column]));
};

export const where = (array, checkItem, checker) => {
	return Enumerable.from(array).where(item => checker(item[checkItem])).toArray();
};