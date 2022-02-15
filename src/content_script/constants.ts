import type { Website } from 'types';

/**
 * The content of the button (used to add/remove fonts) that is injected in the page.
 */
export const buttonContent = {
	add: 'Add to favorites',
	remove: 'Remove from favorites'
};

/**
 * For each supported website, a list of all the data needed to run the content_script
 */
export const websites: Website[] = [
	{
		name: 'Google Fonts',
		regex: 'fonts.google.com/?(.*)/specimen/.*',
		queries: {
			theme: {
				element: 'body', // Which element holds the dark theme class name
				darkThemeClass: 'gf-dark-theme',
				toggle: 'button.theme-toggle'
			},
			titleElement: ['div.sticky-header h1', 'div.breadcrumb__content h1'],
			variants: 'span.variant__style',
			variableAxes: 'div.variable-axes__preview div.axis-container'
		},
		themes: {
			dark: {
				primary: '#8ab4f8', // The button color at default state,
				secondary: '#d2e3fc', // The button text color when hovered,
				tertiary: 'rgba(138, 180, 248, .04)', // The button background when hovered.
				quaternary: 'rgba(138, 180, 248, .25)' // The button background when active
			},
			light: {
				primary: '#1a73e8',
				secondary: '#174ea6',
				tertiary: 'rgba(26, 115, 232, .04)',
				quaternary: 'rgba(26, 115, 232, .25)'
			}
		},
		styles: {
			button: {
				gap: '0.25rem',
				background: 'none',
				border: '1px solid',
				borderRadius: '0.25rem',
				padding: '7px 24px',
				margin: '0 -2rem 0 0',
				fontSize: '14px',
				fontWeight: '500'
			},
			icon: {
				size: '20px',
				padding: '2px'
			}
		}
	}
];
