import type { TypefaceTuple } from 'types/*';
import { fonts, noFonts, noResults, topBar } from './constants';
import {
	createMarkupForTypefaces,
	sort,
	toggleSortDirectionIcon,
	toggleSortMethodIcon
} from './DOM';
import { getSortFunction } from './utils';

export const handleSortMethodBoxClick = (favorites: TypefaceTuple[]) => {
	toggleSortMethodIcon();
	createMarkupForTypefaces(favorites, getSortFunction(sort));
};

export const handleSortDirectionBoxClick = (favorites: TypefaceTuple[]) => {
	toggleSortDirectionIcon();
	createMarkupForTypefaces(favorites, getSortFunction(sort));
};

export const handleSearchKeyup = (event: KeyboardEvent, favorites: TypefaceTuple[]) => {
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

/**
 * Function that handles the click event of the remove button of a font container.
 * @param font - The font container where the remove button is localed within.
 * @param favorites - The array of favorite typefaces.
 * @param slug - The slug of the typeface you want to be removed.
 */
export const handleRemoveBtnClick = (
	font: HTMLDivElement,
	favorites: TypefaceTuple[],
	slug: string
) => {
	console.log('delete');
	font.style.display = 'none';

	const fav = new Map(favorites);
	fav.delete(slug);
	chrome.storage.sync.set({ favorites: Array.from(fav) });
	console.log(fav.size);

	// Hide elements that must not be visible when no typefaces are in the wishlist
	if (fav.size === 0) {
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
