import type { WebsitesExtractionQueries } from 'types/*';
import { identifyWebsite } from './detection';
import { onReady, injectMarkup, extractFontData } from './DOM';
import { injectStyles } from './styles';

onReady(() => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		console.log(favorites);
	});

	const typefaceOrigin = identifyWebsite(document.location.href);

	const queries: WebsitesExtractionQueries = {
		'Google Fonts': {
			titleElement: 'div.sticky-header h1',
			variants: 'span.variant__style',
			variableAxes: 'div.variable-axes__preview div.axis-container'
		}
	};
	const websiteSpecificQueries = queries[typefaceOrigin.name];
	const typeface = extractFontData(typefaceOrigin, websiteSpecificQueries);

	injectStyles(typeface.origin.name);
	injectMarkup(typeface);
});
