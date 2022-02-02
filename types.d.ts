export interface Typeface {
	family: string;
	slug: string;
	variants: string[];
	url: string;
	added_at?: number;
}

export type TypefaceTuple = [string, Typeface];
