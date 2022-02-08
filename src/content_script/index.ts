import { identifyWebsite } from './detection';
import { onReady, injectMarkup, extractFontData } from './DOM';
import { injectStyles } from './styles';
import { websites } from './constants';

onReady(() => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		console.log(favorites);
	});

	const typefaceOrigin = identifyWebsite(document.location.href);
	const website = websites.find((el) => el.name === typefaceOrigin.name);

	if (website === undefined) throw new Error('Unsupported website');

	const typeface = extractFontData(typefaceOrigin, website.queries);

	injectStyles(typeface.origin.name);
	injectMarkup(typeface);
});
