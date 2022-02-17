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

// STYLES

export type CSSRules = {
	[key: string]: string;
};

export type WebsitesSpecificStyles = {
	name: SupportedWebsite;
	styles: string;
};

// QUERIES

export interface ExtractionQueries {
	theme: ThemeQuery;
	titleElement: string[];
	variants: string;
	variableAxes: string;
}

export interface ThemeQuery {
	element: string;
	darkThemeClass: string;
	toggle: string;
}

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
