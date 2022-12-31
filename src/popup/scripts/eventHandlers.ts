import { readSyncStorage, writeSyncStorage } from 'lib/chrome';
import type { TypefaceTuple } from 'types';
import { fonts, noFonts, noResults, topBar } from './constants';
import {
	createMarkupForTypefaces,
	sort,
	toggleSortDirectionIcon,
	toggleSortMethodIcon
} from './DOM';
import { getSortFunction } from './utils';

/**
 * Function than handles the click event on the sort method (by slug, by date) box in the top bar.
 * @param favorites - The favorite typefaces to re-sort and to re-create the markup for.
 */
export const handleSortMethodBoxClick = (favorites: TypefaceTuple[]) => {
	toggleSortMethodIcon();
	createMarkupForTypefaces(favorites, getSortFunction(sort));
};

/**
 * Function that handles the click event on the sort direction (ascending, descending) box in the top bar.
 * @param favorites - The favorite typefaces to re-sort and to re-create the markup for.
 */
export const handleSortDirectionBoxClick = (favorites: TypefaceTuple[]) => {
	toggleSortDirectionIcon();
	createMarkupForTypefaces(favorites, getSortFunction(sort));
};

/**
 * Function that handles the keyup event when typing in the search input field in the top bar.
 * @param event - The event object.
 * @param favorites - The favorites to filter.
 */
export const handleSearchKeyup = (event: KeyboardEvent, favorites: TypefaceTuple[]) => {
	if (!noResults || !fonts) throw new Error('Missing HTML elements');

	const target = event.target as HTMLInputElement;
	const text = target.value.trim().toLowerCase();

	const filteredFavorites = favorites.filter((favorite) => {
		const family = favorite[1].family.toLowerCase();
		return family.includes(text);
	});

	if (filteredFavorites.length > 0) {
		noResults.classList.add('hidden');
		createMarkupForTypefaces(filteredFavorites, getSortFunction(sort));
	} else {
		fonts.innerHTML = '';
		noResults.classList.remove('hidden');
	}
};

export const handleSearchClear = (event: Event, favorites: TypefaceTuple[]) => {
	if (!noResults || !fonts) throw new Error('Missing HTML elements');

	const target = event.target as HTMLInputElement;

	if (target.value === '') {
		fonts.innerHTML = '';
		noResults.classList.add('hidden');
		createMarkupForTypefaces(favorites, getSortFunction(sort));
	}
};

/**
 * Function that handles the click event of the remove button of a font container.
 * @param font - The font container where the remove button is localed within.
 * @param favorites - The array of favorite typefaces.
 * @param slug - The slug of the typeface you want to be removed.
 */
export const handleRemoveBtnClick = async (font: HTMLDivElement, slug: string) => {
	if (!noFonts || !topBar) throw new Error('Missing HTML elements');

	const favorites = new Map((await readSyncStorage('favorites')) as TypefaceTuple[]);
	favorites.delete(slug);

	await writeSyncStorage({
		favorites: Array.from(favorites)
	});

	font.style.display = 'none';

	// Hide elements that must not be visible when no typefaces are in the wishlist
	if (favorites.size === 0) {
		noFonts.classList.remove('hidden');
		topBar.classList.add('hidden');
	}

	// Send message to the content_script that a font has been removed from wishlist.
	// The content_script uses this message to change the state of the add/remove wishlist button.
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id as number, {
			message: 'removed-font',
			font: slug
		});
	});
};
