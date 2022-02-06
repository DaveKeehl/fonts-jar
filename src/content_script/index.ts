import { onReady, identifyWebsite, injectMarkup, extractFontData } from './DOM';
import { injectStyles } from './styles';

onReady(() => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		console.log(favorites);
	});

	const typefaceOrigin = identifyWebsite(document.location.href);

	const queries = {
		'Google Fonts': {
			titleElement: 'div.sticky-header h1',
			variants: 'span.variant__style',
			variableAxes: 'div.variable-axes__preview div.axis-container'
		}
	};
	const typeface = extractFontData(typefaceOrigin, queries[typefaceOrigin.name]);

	injectStyles(typeface.origin.name);
	injectMarkup(typeface);
});
