import type { SupportedWebsite } from 'types/*';
import { minify } from './utils';

const getStyleProperties = (website: SupportedWebsite) => {
	const styles = {
		button: {
			default: {
				gap: () => {
					if (website === 'Google Fonts') return '0.5rem';
				},
				color: () => {
					if (website === 'Google Fonts') return '#8ab4f8';
				},
				background: () => {
					if (website === 'Google Fonts') return 'none';
				},
				border: () => {
					if (website === 'Google Fonts') return '1px solid #8ab4f8';
				},
				borderRadius: () => {
					if (website === 'Google Fonts') return '0.25rem';
				},
				padding: () => {
					if (website === 'Google Fonts') return '7px 24px';
				},
				margin: () => {
					if (website === 'Google Fonts') return '0 -2rem 0 0';
				},
				fontSize: () => {
					if (website === 'Google Fonts') return '14px';
				},
				fontWeight: () => {
					if (website === 'Google Fonts') return '500';
				}
			},
			active: {
				background: () => {
					if (website === 'Google Fonts') return '#354d70';
				}
			},
			hover: {
				color: () => {
					if (website === 'Google Fonts') return '#d2e3fc';
				},
				background: () => {
					if (website === 'Google Fonts') return 'rgba(138, 180, 248, .04)';
				}
			}
		},
		span: {
			fontSize: () => {
				if (website === 'Google Fonts') return '24px';
			},
			height: () => {
				if (website === 'Google Fonts') return '20px';
			}
		}
	};

	return {
		buttonDefault: styles.button.default,
		buttonActive: styles.button.active,
		buttonHover: styles.button.hover,
		span: styles.span
	};
};

const createStyles = (website: SupportedWebsite) => {
	const { buttonDefault, buttonActive, buttonHover, span } = getStyleProperties(website);

	const baseStyles = `
		button.addToFavorites {
			display: flex;
			flex-direction: row-reverse;
			justify-content: center;
			align-items: center;
			gap: ${buttonDefault.gap()};
			background: ${buttonDefault.background()};
			border: ${buttonDefault.border()};
			color: ${buttonDefault.color()};
			padding: ${buttonDefault.padding()};
			margin: ${buttonDefault.margin()};
			border-radius: ${buttonDefault.borderRadius()};
			font-family: inherit;
			font-size: ${buttonDefault.fontSize()};
			font-weight: ${buttonDefault.fontWeight()};
		}

		button.addToFavorites:hover {
			color: ${buttonHover.color()};
			background: ${buttonHover.background()};
			cursor: pointer;
		}

		button.addToFavorites.active,
		button.addToFavorites.active:hover {
			background: ${buttonActive.background()};
		}
		
		button.addToFavorites span {
			display: flex;
			align-items: center;
			transform: translateY(-1px);
			font-size: ${span.fontSize()};
			height: ${span.height()};
		}
	`;

	const websiteSpecificStyles = {
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
