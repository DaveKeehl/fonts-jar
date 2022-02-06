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

export interface TypefaceExtractionQueries {
	titleElement: string;
	variants: string;
	variableAxes: string;
}
