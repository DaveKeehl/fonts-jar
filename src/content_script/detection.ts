import type { SupportedWebsite, ThemeType, TypefaceOrigin } from 'types';
import { websites } from './constants';

/**
 * Given a url, this function checks whether the website is either supported or not.
 * @param url - The url to be checked.
 * @returns If the url is supported, an object of type TypefaceOrigin is returned. Otherwise an error is thrown.
 */
export const identifyWebsite = (url: string): TypefaceOrigin | never => {
	const origin = websites.find((website) => {
		const match = new RegExp(website.regex.match).test(url);
		const ignore = new RegExp(website.regex.ignore).test(url);
		return match && !ignore;
	});

	if (origin === undefined) {
		throw new Error(`The received url (${url}) does not seem to be supported`);
	}

	return {
		name: origin.name,
		url
	};
};

/**
 * Given some DOM information, detect whether dark mode or light is being used.
 * @param website - The website to extract the theme from.
 * @returns The theme name.
 */
export const identifyTheme = (website: SupportedWebsite): ThemeType => {
	const origin = websites.filter((el) => el.name === website)[0];
	const themeQuery = origin.queries.theme;
	const element = document.querySelector(themeQuery.element) as Element;
	return element.classList.contains(themeQuery.darkThemeClass) ? 'dark' : 'light';
};

/**
 * Function that given a query string, it returns an element representing the theme toggle button.
 * @param query - The query to be used.
 * @returns The theme toggle button
 */
export const getThemeToggleButton = (query: string) => {
	return document.querySelector(query) as HTMLButtonElement;
};
