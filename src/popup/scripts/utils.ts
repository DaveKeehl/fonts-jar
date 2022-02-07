import type { CompareFunction, Sort, TypefaceTuple } from 'types';

export const sortAscendingBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
	if (a[1].slug < b[1].slug) return -1;
	if (a[1].slug > b[1].slug) return 1;
	return 0;
};

export const sortDescendingBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
	if (a[1].slug > b[1].slug) return -1;
	if (a[1].slug < b[1].slug) return 1;
	return 0;
};

export const sortAscendingByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
	const aDate = new Date(a[1].added_at);
	const bDate = new Date(b[1].added_at);

	if (+aDate < +bDate) return -1;
	if (+aDate > +bDate) return 1;
	return 0;
};

export const sortDescendingByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
	const aDate = new Date(a[1].added_at);
	const bDate = new Date(b[1].added_at);

	if (+aDate > +bDate) return -1;
	if (+aDate < +bDate) return 1;
	return 0;
};

export const getSortFunction = (sort: Sort) => {
	const { method, direction } = sort;
	let sortFunction: CompareFunction | string = '';

	if (method === 'bySlug' && direction === 'ascending') sortFunction = sortAscendingBySlug;
	if (method === 'byDate' && direction === 'ascending') sortFunction = sortAscendingByDate;
	if (method === 'bySlug' && direction === 'descending') sortFunction = sortDescendingBySlug;
	if (method === 'byDate' && direction === 'descending') sortFunction = sortDescendingByDate;

	console.log(sortFunction);

	return sortFunction as CompareFunction;
};
