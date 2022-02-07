export interface Typeface {
	family: string;
	slug: string;
	styles: string[];
	variableAxes: number;
	origin: TypefaceOrigin;
	added_at: string;
}

export type TypefaceTuple = [string, Typeface];

export interface TypefaceOrigin {
	name: SupportedWebsite;
	url: string;
}

export type SupportedWebsite = 'Google Fonts';
export type SupportedWebsites = { name: SupportedWebsite; regex: string }[];

export interface ExtractionQueries {
	titleElement: string;
	variants: string;
	variableAxes: string;
}

type WebsitesGenericObject<Type> = {
	[key in SupportedWebsite]: Type;
};

export type WebsitesExtractionQueries = WebsitesGenericObject<ExtractionQueries>;
export type WebsitesSpecificStyles = WebsitesGenericObject<string>;

export type CompareFunction = (a: TypefaceTuple, b: TypefaceTuple) => 1 | -1 | 0;
export type SortMethod = 'bySlug' | 'byDate';
export type SortDirection = 'ascending' | 'descending';

export interface Sort {
	method: SortMethod;
	direction: SortDirection;
}
