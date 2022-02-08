// TYPEFACE

export interface Typeface {
	family: string;
	slug: string;
	styles: string[];
	variableAxes: number;
	origin: TypefaceOrigin;
	added_at: string;
	collections?: string[];
}

export type TypefaceTuple = [string, Typeface];

export interface TypefaceOrigin {
	name: SupportedWebsite;
	url: string;
}

// WEBSITE

export interface Website {
	name: SupportedWebsite;
	regex: string;
	queries: ExtractionQueries;
	styles: {
		button: {
			default: CSSRules;
			active: CSSRules;
			hover: CSSRules;
		};
		icon: CSSRules;
	};
}
export type SupportedWebsite = 'Google Fonts';

export interface ExtractionQueries {
	titleElement: string;
	variants: string;
	variableAxes: string;
}

export type CSSRules = {
	[key: string]: string;
};

export type WebsitesGenericObject<Type> = {
	[key in SupportedWebsite]: Type;
};

export type WebsitesExtractionQueries = WebsitesGenericObject<ExtractionQueries>;
export type WebsitesSpecificStyles = WebsitesGenericObject<string>;

// POPUP

export type CompareFunction = (a: TypefaceTuple, b: TypefaceTuple) => 1 | -1 | 0;
export type SortMethod = 'bySlug' | 'byDate';
export type SortDirection = 'ascending' | 'descending';

export interface Sort {
	method: SortMethod;
	direction: SortDirection;
}
