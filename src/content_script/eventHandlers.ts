import { readSyncStorage } from 'lib/chrome';
import type { Typeface, TypefaceTuple } from 'types/typeface';
import { toggleButtonState } from './DOM';

/**
 * Function that gets fired whenever the injected button is clicked.
 * @param button - The injected <button> element.
 * @param typeface - The typeface metadata used to either remove or add the typeface to the wishlist.
 */
export const handleButtonClick = async (
	buttons: NodeListOf<HTMLButtonElement>,
	typeface: Typeface
) => {
	const favorites = new Map((await readSyncStorage('favorites')) as TypefaceTuple[]);
	const fontInFavorites = favorites.has(typeface.slug);

	buttons.forEach((button) => {
		toggleButtonState(button, !fontInFavorites, () => {
			if (!fontInFavorites) {
				const now = new Date();
				typeface['added_at'] = now.toString();
				favorites.set(typeface.slug, typeface);
			} else {
				favorites.delete(typeface.slug);
			}
		});
	});

	chrome.storage.sync.set({
		favorites: Array.from(favorites)
	});
};
