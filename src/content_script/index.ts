import { onReady, injectMarkup, injectStyles, extractFontData } from './utils';

onReady(() => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		console.log(favorites);
	});

	const titleElement = document.querySelector('title') as HTMLTitleElement;
	const pageTitle = titleElement.textContent as string;
	const url = document.location.href;

	// const googleFonts = pageTitle.contains('google fonts') || url.contains

	injectStyles();
	injectMarkup(extractFontData());
});
