import { identifyTheme, identifyWebsite, getThemeToggleButton } from './detection';
import { onReady, injectMarkup, extractFontData } from './DOM';
import { injectStyles } from './styles';
import { websites } from './constants';
import { readSyncStorage } from 'lib/chrome';

onReady(async () => {
	const favorites = await readSyncStorage('favorites');
	console.log(favorites);

	const typefaceOrigin = identifyWebsite(document.location.href);
	const website = websites.find((el) => el.name === typefaceOrigin.name);

	if (website === undefined) throw new Error('Unsupported website');

	const theme = identifyTheme(website.name);
	const themeToggleButton = getThemeToggleButton(website.queries.theme.toggle);
	const typeface = extractFontData(typefaceOrigin, website.queries);

	injectStyles(typeface.origin.name, theme);
	injectMarkup(typeface, themeToggleButton);
});
