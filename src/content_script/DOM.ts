import type { ExtractionQueries, SupportedWebsite, Typeface, TypefaceOrigin } from 'types';
import { buttonContent } from './constants';
import { slugify } from './utils';

/**
 * Function that fires when the DOM is ready to run the content_script code.
 * @param callback - The function to be run when the DOM is ready.
 */
export const onReady = (callback: () => unknown) => {
	if (document.readyState != 'loading') {
		setTimeout(callback, 1000);
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
};

/**
 * Given a TypefaceOrigin object, this function returns a Typeface object containing the required metadata of the typeface extracted for the currently visited page.
 * @param origin - The object containing the typeface origin metadata to know how to extract the typeface metadata.
 * @returns An object of type Typeface containing the typeface metadata.
 */
export const extractFontData = (origin: TypefaceOrigin, queries: ExtractionQueries): Typeface => {
	const titleElement = document.querySelector(queries.titleElement) as HTMLHeadingElement;
	const title = titleElement.textContent as string;
	const variants = document.querySelectorAll<HTMLSpanElement>(queries.variants);
	const variableAxes = document.querySelectorAll<HTMLDivElement>(queries.variableAxes);

	return {
		family: title,
		slug: slugify(title),
		styles: [...variants]
			.map((variant) => (variant.textContent !== null ? variant.textContent.trim() : ''))
			.filter((variant) => variant !== ''),
		variableAxes: variableAxes !== undefined ? variableAxes.length : 0,
		origin: {
			name: origin.name,
			url: origin.url
		},
		added_at: ''
	};
};

/**
 * Function that creates the button element to be placed on the screen.
 * @returns The created <button> element and its inner <span> icon element.
 */
const createButton = (): [HTMLButtonElement, HTMLSpanElement] => {
	const button = document.createElement('button');
	button.innerText = buttonContent.add.text;
	button.classList.add('addToFavorites');

	const icon = document.createElement('span');
	icon.textContent = buttonContent.add.icon;
	button.appendChild(icon);

	return [button, icon];
};

/**
 * Function that takes a <button> element and places it on the right place in the DOM.
 * @param button - The button element to be positioned on the screen.
 */
const placeButtonOnScreen = (website: SupportedWebsite, button: HTMLButtonElement) => {
	if (website === 'Google Fonts') {
		const downloadButtonStd = document.querySelector(
			'button.sticky-header__cta-button'
		) as HTMLButtonElement;
		downloadButtonStd.insertAdjacentElement('beforebegin', button);
	}
};

/**
 * Function that toggles the state of the created <button> element.
 * @param button - The <button> element to be updated.
 * @param icon - The <span> icon element inside the <button>.
 * @param fontInFavorites - Whether the typeface represented by the currently visited page is in the favorites.
 * @param fn - An optional callback function to be run everytime this function is fired.
 */
const toggleButtonState = (
	button: HTMLButtonElement,
	icon: HTMLSpanElement,
	fontInFavorites: boolean,
	fn: () => unknown = () => null
) => {
	button.classList.toggle('active', fontInFavorites);
	button.innerText = buttonContent[fontInFavorites ? 'remove' : 'add'].text;
	icon.textContent = buttonContent[fontInFavorites ? 'remove' : 'add'].icon;
	button.appendChild(icon);
	fn();
};

/**
 * Function that gets fired whenever the injected button is clicked.
 * @param button - The injected <button> element.
 * @param icon - The <span> element inside the button that contains the icon.
 * @param typeface - The typeface metadata used to either remove or add the typeface to the wishlist.
 */
const handleButtonClick = (
	button: HTMLButtonElement,
	icon: HTMLSpanElement,
	typeface: Typeface
) => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		const fav = new Map(favorites);
		const fontInFavorites = fav.has(typeface.slug);

		toggleButtonState(button, icon, !fontInFavorites, () => {
			if (!fontInFavorites) {
				const now = new Date();
				typeface['added_at'] = now.toString();
				fav.set(typeface.slug, typeface);
				console.log(fav);
			} else {
				fav.delete(typeface.slug);
			}
		});
		chrome.storage.sync.set({ favorites: Array.from(fav) });
	});
};

/**
 * Given a Typeface object, inject in the DOM the needed markup.
 * @param typeface - The typeface metadata needed to create the markup.
 */
export const injectMarkup = (typeface: Typeface) => {
	const [button, icon] = createButton();

	if (typeface.origin.name === 'Google Fonts') {
		// Fix button style when placed in collapsed header
		document.addEventListener('scroll', () => {
			button.classList.toggle('collapsed-header', window.scrollY > 130);
		});
	}

	// Check if page font is in favorites
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		const fav = new Map(favorites);
		const fontInFavorites = fav.has(typeface.slug);
		toggleButtonState(button, icon, fontInFavorites);
	});

	// React to click events on new added button
	button.addEventListener('click', () => handleButtonClick(button, icon, typeface));

	// Update button when extension removes font
	chrome.runtime.onMessage.addListener((request) => {
		const canUpdateButton = request.message === 'removed-font' && request.font === typeface.slug;
		toggleButtonState(button, icon, !canUpdateButton);
	});

	placeButtonOnScreen(typeface.origin.name, button);
};
