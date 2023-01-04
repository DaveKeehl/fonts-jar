import { SupportedWebsite } from '../types';

export interface Typeface {
	family: string;
	slug: string;
	styles: string[];
	variableAxes: number;
	origin: TypefaceOrigin;
	added_at: string;
	collections: string[];
}

export type TypefaceTuple = [string, Typeface]; // [<typeface_name>, <typeface_data>]

export interface TypefaceOrigin {
	name: SupportedWebsite;
	url: string;
}
