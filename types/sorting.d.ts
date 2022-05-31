import type { TypefaceTuple } from './typeface';

/**
 * Return types:
 *  1 = "a" comes first than "b"
 * -1 = "b" comes first than "a"
 *  0 = Keep "a" and "b" in the original order
 */
export type CompareFunction = (a: TypefaceTuple, b: TypefaceTuple) => 1 | -1 | 0;

export type SortMethod = 'bySlug' | 'byDate';
export type SortDirection = 'ascending' | 'descending';

export interface Sort {
	method: SortMethod;
	direction: SortDirection;
}
