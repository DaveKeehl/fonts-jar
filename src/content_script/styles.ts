import type { SupportedWebsite, WebsitesSpecificStyles } from 'types/*';
import { websites } from './constants';
import { minify } from './utils';

/**
 * Given a supported website, return the minified CSS to be injected in the webpage.
 * This function is guaranteed to only be called with the information of a supported website.
 * @param website - The website for which the CSS styles must be created.
 * @returns The minified CSS to be injected in the page.
 */
const createStyles = (website: SupportedWebsite) => {
	const { button, icon } = websites.filter((el) => el.name === website)[0].styles;

	const baseStyles = `
		button.addToFavorites {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: ${button.default.gap};
			background: ${button.default.background};
			border: ${button.default.border};
			font-family: inherit;
			color: ${button.default.color};
			padding: ${button.default.padding};
			margin: ${button.default.margin};
			border-radius: ${button.default.borderRadius};
		}

		button.addToFavorites:hover {
			color: ${button.hover.color};
			background: ${button.hover.background};
			cursor: pointer;
		}

		button.addToFavorites.active,
		button.addToFavorites.active:hover {
			background: ${button.active.background};
		}

		button.addToFavorites svg {
			height: ${icon.size};
			width: ${icon.size};
			padding: ${icon.padding};
		}

		button.addToFavorites svg line {
			stroke: ${button.default.color};
		}
		
		button.addToFavorites span {
			font-size: ${button.default.fontSize};
			font-weight: ${button.default.fontWeight};
		}
	`;

	const websiteSpecificStyles: WebsitesSpecificStyles = {
		'Google Fonts': `
			button.addToFavorites.collapsed-header {
				margin-right: 1rem;
			}
		`
	};

	return minify(`${baseStyles} ${websiteSpecificStyles[website]}`);
};

/**
 * Given the typeface origin, inject the styles in the DOM that match the website you are on.
 * @param typefaceOrigin - The typeface origin metadata to be used to know on which supported website you are on.
 */
export const injectStyles = (website: SupportedWebsite) => {
	const head = document.querySelector('head') as HTMLHeadElement;
	const stylesheet = document.createElement('style');

	stylesheet.setAttribute('data-extension', 'fonts-jar');
	stylesheet.innerHTML = createStyles(website);

	head.appendChild(stylesheet);
};
