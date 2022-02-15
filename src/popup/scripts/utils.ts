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

/**
 * Utility function to read from the chrome synced storage.
 * @param key - The key of the storage item you want to access.
 * @returns A promise.
 */
export const readSyncStorage = async (key: string | null) => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(key, (data) => {
			if (key === null) {
				resolve(data);
			} else if (key !== null && key !== undefined) {
				resolve(data[key]);
			} else {
				reject();
			}
		});
	});
};

/**
 * Utility function to write to the chrome synced storage.
 * @param data - What you want to store.
 * @returns A promise.
 */
export const writeSyncStorage = async (data: { [key: string]: unknown }) => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.set(data, () => {
			if (data !== undefined) {
				resolve(data);
			} else {
				reject();
			}
		});
	});
};
