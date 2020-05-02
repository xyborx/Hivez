import Enumerable from "linq";

export const groupBy = (array, groupItem) => {
	return Enumerable.from(array).groupBy(item => item[groupItem], null, (key, g) => {return {id: key, data: g.select().toArray()}}).toArray();
}

export const leftExcludingJoin = (leftArray, rightArray, id) => {
	return Enumerable.from(leftArray).except(rightArray).toArray();
}

export const selectSpecificColumn = (array, column) => {
	return Enumerable.from(array).select(item => item[column]).toArray();
}

export const where = (array, checkItem, checker) => {
	return Enumerable.from(array).where(item => checker(item[checkItem])).toArray();
}