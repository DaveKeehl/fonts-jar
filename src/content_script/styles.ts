import type { SupportedWebsite, ThemeType, WebsitesSpecificStyles } from 'types';
import { websites } from './constants';
import { minify } from './utils';

/**
 * Given a supported website, it returns the minified CSS to be injected in the webpage.
 * This function is guaranteed to only be called with the information of a supported website.
 * @param website - The website for which the CSS styles must be created.
 * @param theme - The theme name.
 * @returns The minified CSS to be injected in the page.
 */
const createStyles = (website: SupportedWebsite, theme: ThemeType) => {
	const origin = websites.filter((el) => el.name === website)[0];
	const themeData = origin.themes[theme];

	if (themeData === undefined) {
		throw new Error(`Theme "${theme}" does not exist for website "${website}"`);
	}

	const { button, icon } = origin.styles;

	const baseStyles = `
		button.addToFavorites {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: ${button.gap};
			background: none;
			border: ${button.border} ${themeData.primary};
			font-family: inherit;
			color: ${themeData.primary};
			padding: ${button.padding};
			margin: ${button.margin};
			border-radius: ${button.borderRadius};
		}

		button.addToFavorites:hover {
			color: ${themeData.secondary};
			background: ${themeData.tertiary};
			cursor: pointer;
		}

		button.addToFavorites:hover svg line {
			stroke: ${themeData.secondary};
		}

		button.addToFavorites.active,
		button.addToFavorites.active:hover {
			background: ${themeData.quaternary};
		}

		button.addToFavorites svg {
			height: ${icon.size};
			width: ${icon.size};
			padding: ${icon.padding};
		}

		button.addToFavorites svg line {
			stroke: ${themeData.primary};
		}
		
		button.addToFavorites span {
			font-size: ${button.fontSize};
			font-weight: ${button.fontWeight};
		}
	`;

	const websiteSpecificStyles: WebsitesSpecificStyles[] = [
		{
			name: 'Google Fonts',
			styles: `
				button.addToFavorites.collapsed-header {
					margin-right: 0.75rem;
				}
			`
		}
	];

	return minify(
		`${baseStyles} ${websiteSpecificStyles.filter((el) => el.name === website)[0].styles}`
	);
};

/**
 * Given the typeface origin, inject the styles in the DOM that match the website you are on.
 * @param website - The website to generate the styles for.
 * @param theme - The theme name.
 */
export const injectStyles = (website: SupportedWebsite, theme: ThemeType) => {
	const head = document.querySelector('head') as HTMLHeadElement;
	const oldStylesheet = document.querySelector(
		'style[data-extension="font-jar"]'
	) as HTMLStyleElement;

	if (oldStylesheet === null) {
		const stylesheet = document.createElement('style');
		stylesheet.setAttribute('data-extension', 'fonts-jar');
		head.appendChild(stylesheet);
		stylesheet.innerHTML = createStyles(website, theme);
	} else {
		oldStylesheet.innerHTML = createStyles(website, theme);
	}
};
