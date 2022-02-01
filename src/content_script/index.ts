import { onReady, injectMarkup, injectStyles, extractFontData } from './utils';

onReady(() => {
	injectStyles();
	injectMarkup(extractFontData());
});
