export interface Website {
	name: SupportedWebsite;
	regex: {
		match: RegExp;
		ignore?: RegExp;
	};
	queries: ExtractionQueries;
	themes: {
		[key in ThemeType]?: {
			primary: string;
			secondary: string;
			tertiary: string;
			quaternary: string;
		};
	};
	styles: {
		button: { [key: string]: string };
		icon: { [key: string]: string };
	};
}

// WEBSITES

export type SupportedWebsite = 'Google Fonts';

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

export type ThemeType = 'light' | 'dark';
