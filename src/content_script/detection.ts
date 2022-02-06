import type { TypefaceOrigin, SupportedWebsites } from 'types/*';

/**
 * Given a url, this function checks whether the website is either supported or not.
 * @param url - The url to be checked.
 * @returns If the url is supported, an object of type TypefaceOrigin is returned. Otherwise an error is thrown.
 */
export const identifyWebsite = (url: string): TypefaceOrigin | never => {
	const websites: SupportedWebsites = [
		{
			name: 'Google Fonts',
			regex: 'fonts.google'
		}
	];

	const origin = websites.find((website) => new RegExp(website.regex).test(url));

	if (origin === undefined) {
		throw new Error(`The received url (${url}) does not seem to be supported`);
	}

	return {
		name: origin.name,
		url
	};
};
