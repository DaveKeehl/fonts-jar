import type { TypefaceTuple } from './typeface';

export type CompareFunction = (a: TypefaceTuple, b: TypefaceTuple) => 1 | -1 | 0;
export type SortMethod = 'bySlug' | 'byDate';
export type SortDirection = 'ascending' | 'descending';

export interface Sort {
	method: SortMethod;
	direction: SortDirection;
}
