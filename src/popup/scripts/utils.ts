import type { SortMethod, TypefaceTuple } from 'types';

/**
 * Compare function to sort a list of typefaces based on their slug.
 * @param a - The first typeface to compare.
 * @param b - The second typeface to compare.
 * @returns Returns -1 whether the first slug comes first in the alphabet, 1 whether the first one comes after, else 0 whether they are the same.
 */
export const sortBySlug = (a: TypefaceTuple, b: TypefaceTuple) => {
	if (a[1].slug < b[1].slug) return -1;
	if (a[1].slug > b[1].slug) return 1;
	return 0;
};

/**
 * Compare function to sort a list of typefaces based on their date.
 * @param a - The first typeface to compare.
 * @param b - The second typeface to compare.
 * @returns Returns -1 whether the first date is older, 1 whether the first one is newer, else 0 whether they are the same.
 */
export const sortByDate = (a: TypefaceTuple, b: TypefaceTuple) => {
	const aDate = new Date(a[1].added_at);
	const bDate = new Date(b[1].added_at);

	if (+aDate < +bDate) return 1;
	if (+aDate > +bDate) return -1;
	return 0;
};

export const getSortFunction = (defaultSort: SortMethod) => {
	return defaultSort === 'bySlug' ? sortBySlug : sortByDate;
};
