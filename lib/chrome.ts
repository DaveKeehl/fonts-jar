import { websites } from '../src/content_script/constants';
import { isUrlLegal } from '../src/content_script/utils';
import type { TypefaceTuple } from 'types';

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

/**
 * Utility function to get a map representation of the favorite fonts from chrome.storage.sync.
 * @returns A map data structure of the favorite fonts.
 */
export const getFavorites = async () => {
	return new Map((await readSyncStorage('favorites')) as TypefaceTuple[]);
};

/**
 * Extract the unique set of collections from the favorite fonts.
 * @param favorites - The fonts to extract the collections from.
 * @returns An array containing the unique collections.
 */
export const getCollections = (favorites: TypefaceTuple[]) => {
	const res = favorites
		.filter((favorites) => favorites[1].collections.length > 0)
		.map((favorite) => favorite[1].collections);

	return Array.from(new Set(res.flat()));
};

/**
 * Function that checks whether a property key exists within a given object.
 * @param arg - The object that might have the key in.
 * @param key - The key to check in the object.
 * @returns It returns the key value if the key exists, else either undefined (if it's not an object in the first place) or false (if the object doesn't have that key).
 */
export const hasObjectKey = (arg: unknown, key: string) => {
	if (!arg || typeof arg !== 'object') {
		return undefined;
	}

	const propertyExists = Object.prototype.hasOwnProperty.call(arg, key);
	return propertyExists ? (arg as any)[key] : false;
};

/**
 * Function that checks that the passed argument is an array of strings.
 * @param arg - The argument to check.
 * @returns Whether the argument is an array of strings or not.
 */
export const isStringArray = (arg: unknown, minLength?: number) => {
	if (Array.isArray(arg)) {
		if (minLength && arg.length < minLength) {
			return false;
		}

		return (arg as unknown[]).every((item) => isString(item));
	}

	return false;
};

/**
 * Function that checks that the passed value is a string.
 * @param value - The value to check.
 * @returns Whether the passed value is a string or not.
 */
export const isString = (value: unknown) => typeof value === 'string';

/**
 * Function that checks whether an alleged Typeface object contains a valid "added_at" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "added_at" property.
 */
export const hasLegalAddedAt = (favorite: unknown) => {
	const added_at = hasObjectKey(favorite, 'added_at');

	if (added_at) {
		const date = new Date(added_at);
		return !!date;
	}

	return false;
};

/**
 * Function that checks whether an alleged Typeface object contains a valid "collections" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "collections" property.
 */
export const hasLegalCollections = (favorite: unknown) => {
	const collections = hasObjectKey(favorite, 'collections');
	return isStringArray(collections);
};

/**
 * Function that checks whether an alleged Typeface object contains a valid "family" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "family" collections property.
 */
export const hasLegalFamily = (favorite: unknown) => {
	const family = hasObjectKey(favorite, 'family');
	return isString(family);
};

/**
 * Function that checks whether an alleged Typeface object contains a valid "origin" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "origin" collections property.
 */
export const hasLegalOrigin = (favorite: unknown) => {
	const origin = hasObjectKey(favorite, 'origin');
	const name = hasObjectKey(origin, 'name');
	const url = hasObjectKey(origin, 'url');

	const websiteNames = websites.map((website) => website.name);
	const websitesRegex = websites.map((website) => website.regex);

	const isValidName = websiteNames.some((websiteName) => websiteName === name);
	const hasValidUrl = websitesRegex.some((websiteRegex) => isUrlLegal(url, websiteRegex));

	return origin && isValidName && hasValidUrl;
};

/**
 * Function that checks whether an alleged Typeface object contains a valid "slug" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "slug" collections property.
 */
export const hasLegalSlug = (favorite: unknown, tupleSlug: string) => {
	const slug = hasObjectKey(favorite, 'slug');
	return isString(slug) && slug === tupleSlug;
};

/**
 * Function that checks whether an alleged Typeface object contains a valid "styles" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "styles" collections property.
 */
export const hasLegalStyles = (favorite: unknown) => {
	const styles = hasObjectKey(favorite, 'styles');
	return isStringArray(styles, 1);
};

/**
 * Function that checks whether an alleged Typeface object contains a valid "variableAxes" property.
 * @param favorite - The alleged Typeface object.
 * @returns Whether the object contains a valid "variableAxes" collections property.
 */
export const hasLegalVariableAxes = (favorite: unknown) => {
	const variableAxes = hasObjectKey(favorite, 'variableAxes');

	if (typeof variableAxes !== 'number') {
		return false;
	}

	return variableAxes >= 0;
};

export const isTypefaceTuple = (item: unknown) => {
	const isArray = Array.isArray(item);
	const hasCorrectLength = (item as unknown[]).length === 2;

	if (!isArray || !hasCorrectLength) {
		return false;
	}

	const tuple = item as unknown[];
	const hasSlugAtFirstPosition = isString(tuple[0]);
	const hasObjectAtSecondPosition =
		typeof tuple[1] === 'object' && tuple[1] !== null && tuple[1] !== undefined;

	return isArray && hasCorrectLength && hasSlugAtFirstPosition && hasObjectAtSecondPosition;
};

export const isValidTypeface = (item: unknown) => {
	const isValidTuple = isTypefaceTuple(item);

	if (!isValidTuple) {
		return false;
	}

	const typefaceTuple = item as [string, unknown];
	const tupleSlug = typefaceTuple[0];
	const favorite = typefaceTuple[1];

	const has_added_at = hasLegalAddedAt(favorite);
	const has_collections = hasLegalCollections(favorite);
	const has_family = hasLegalFamily(favorite);
	const has_origin = hasLegalOrigin(favorite);
	const has_slug = hasLegalSlug(favorite, tupleSlug);
	const has_styles = hasLegalStyles(favorite);
	const has_variableAxes = hasLegalVariableAxes(favorite);

	const isValid =
		isValidTuple &&
		has_added_at &&
		has_collections &&
		has_family &&
		has_origin &&
		has_slug &&
		has_styles &&
		has_variableAxes;

	return isValid;
};

/**
 * Function that validates an array, checking if it's a valid Typeface object
 * @param favorites - The alleged favorites to check.
 * @returns Whether the received array is a valid Typeface object array.
 */
export const isImportedDataValid = (favorites: unknown[]) => {
	if (favorites.length === 0) {
		return false;
	}

	for (const item of favorites) {
		if (!isValidTypeface(item)) {
			return false;
		}
	}

	return true;
};
