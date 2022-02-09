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
	themes: Themes;
	styles: {
		button: CSSRules;
		icon: CSSRules;
	};
}
export type SupportedWebsite = 'Google Fonts';

export interface ExtractionQueries {
	theme: ThemeQuery;
	titleElement: string;
	variants: string;
	variableAxes: string;
}

export interface ThemeQuery {
	element: string;
	darkThemeClass: string;
	toggle: string;
}

export type CSSRules = {
	[key: string]: string;
};

export type WebsitesSpecificStyles = {
	name: SupportedWebsite;
	styles: string;
};

// THEME

export type Themes = {
	[key in ThemeType]?: Theme;
};

export interface Theme {
	primary: string;
	secondary: string;
	tertiary: string;
	quaternary: string;
}
export type ThemeType = 'light' | 'dark';

// POPUP

export type CompareFunction = (a: TypefaceTuple, b: TypefaceTuple) => 1 | -1 | 0;
export type SortMethod = 'bySlug' | 'byDate';
export type SortDirection = 'ascending' | 'descending';

export interface Sort {
	method: SortMethod;
	direction: SortDirection;
}
