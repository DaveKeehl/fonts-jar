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

/**
 * Given some sorting information (method and direction), return the appropriate compare function to be used.
 * @param sort - The sorting information (method and direction).
 * @returns The appropriate compare function.
 */
export const getSortFunction = (sort: Sort) => {
	const { method, direction } = sort;
	let sortFunction: CompareFunction | string = '';

	if (method === 'bySlug' && direction === 'ascending') sortFunction = sortAscendingBySlug;
	if (method === 'byDate' && direction === 'ascending') sortFunction = sortAscendingByDate;
	if (method === 'bySlug' && direction === 'descending') sortFunction = sortDescendingBySlug;
	if (method === 'byDate' && direction === 'descending') sortFunction = sortDescendingByDate;

	return sortFunction as CompareFunction;
};

/**
 * Check whether a given object is a valid stored sorting object.
 * @param storedSort - The object to check.
 * @returns Whether the object is valid or not.
 */
export const isStoredSortValid = (storedSort: object) => {
	return (
		storedSort !== undefined &&
		Object.prototype.hasOwnProperty.call(storedSort, 'method') &&
		Object.prototype.hasOwnProperty.call(storedSort, 'direction')
	);
};
