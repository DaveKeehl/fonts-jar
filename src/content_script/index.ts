import { onReady, injectMarkup, injectStyles, extractFontData } from './utils';

onReady(() => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		console.log(favorites);
	});

	injectStyles();
	injectMarkup(extractFontData());
});
