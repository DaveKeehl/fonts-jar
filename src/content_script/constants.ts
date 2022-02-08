import type { Website } from 'types/*';

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
		regex: 'fonts.google',
		queries: {
			titleElement: 'div.sticky-header h1',
			variants: 'span.variant__style',
			variableAxes: 'div.variable-axes__preview div.axis-container'
		},
		styles: {
			button: {
				default: {
					gap: '0.25rem',
					color: '#8ab4f8',
					background: 'none',
					border: '1px solid #8ab4f8',
					borderRadius: '0.25rem',
					padding: '7px 24px',
					margin: '0 -2rem 0 0',
					fontSize: '14px',
					fontWeight: '500'
				},
				active: {
					background: '#354d70'
				},
				hover: {
					color: '#d2e3fc',
					background: 'rgba(138, 180, 248, .04)'
				}
			},
			icon: {
				size: '20px',
				padding: '2px'
			}
		}
	}
];
