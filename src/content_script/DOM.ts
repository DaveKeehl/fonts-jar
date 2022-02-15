import { readSyncStorage } from 'src/popup/scripts/utils';
import type {
	ExtractionQueries,
	SupportedWebsite,
	Typeface,
	TypefaceOrigin,
	TypefaceTuple
} from 'types';
import { buttonContent, websites } from './constants';
import { identifyTheme } from './detection';
import { injectStyles } from './styles';
import { slugify } from './utils';

/**
 * Function that fires when the DOM is ready to run the content_script code.
 * @param callback - The function to be run when the DOM is ready.
 */
export const onReady = (fn: () => unknown) => {
	let previousUrl = '';
	const urls = websites.map((website) => website.regex);

	const observer = new MutationObserver(() => {
		const hasUrlChanged = location.href !== previousUrl;
		const isUrlLegal = urls.some((url) => new RegExp(url).test(location.href));

		if (hasUrlChanged) {
			previousUrl = location.href;
			// console.log(`URL changed to ${location.href}`);

			if (isUrlLegal && document.readyState != 'loading') {
				setTimeout(fn, 300);
			} else {
				document.addEventListener('DOMContentLoaded', fn);
			}
		}
	});

	const config = {
		subtree: true,
		childList: true
	};
	observer.observe(document, config);
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
		added_at: '',
		collections: []
	};
};

/**
 * Function that creates the button element to be placed on the screen.
 * @returns The created <button> element.
 */
const createButton = (): HTMLButtonElement => {
	const button = document.createElement('button');
	button.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
			<line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
		</svg>
		<span>${buttonContent.add}</span>
	`;
	button.classList.add('addToFavorites');
	return button;
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
 * @param fontInFavorites - Whether the typeface represented by the currently visited page is in the favorites.
 * @param fn - An optional callback function to be run everytime this function is fired.
 */
const toggleButtonState = (
	button: HTMLButtonElement,
	fontInFavorites: boolean,
	fn: () => unknown = () => null
) => {
	button.classList.toggle('active', fontInFavorites);
	button.innerHTML = fontInFavorites
		? `
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
		</svg>
		<span>${buttonContent.remove}</span>
	`
		: `
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
			<line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="24"></line>
		</svg>
		<span>${buttonContent.add}</span>
	`;
	fn();
};

/**
 * Function that gets fired whenever the injected button is clicked.
 * @param button - The injected <button> element.
 * @param typeface - The typeface metadata used to either remove or add the typeface to the wishlist.
 */
const handleButtonClick = async (button: HTMLButtonElement, typeface: Typeface) => {
	const favorites = (await readSyncStorage('favorites')) as TypefaceTuple[];

	const fav = new Map(favorites);
	const fontInFavorites = fav.has(typeface.slug);

	toggleButtonState(button, !fontInFavorites, () => {
		if (!fontInFavorites) {
			const now = new Date();
			typeface['added_at'] = now.toString();
			fav.set(typeface.slug, typeface);
		} else {
			fav.delete(typeface.slug);
		}
	});

	chrome.storage.sync.set({
		favorites: Array.from(fav)
	});
};

/**
 * Given a Typeface object, inject in the DOM the needed markup.
 * @param typeface - The typeface metadata needed to create the markup.
 * @param themeToggleButton - The theme toggle <button> element used to switch theme.
 */
export const injectMarkup = (typeface: Typeface, themeToggleButton: HTMLButtonElement) => {
	const button = createButton();
	const website = typeface.origin.name;

	if (website === 'Google Fonts') {
		// Fix button style when placed in collapsed header
		document.addEventListener('scroll', () => {
			button.classList.toggle('collapsed-header', window.scrollY > 130);
		});
	}

	// If there is a theme toggle button, attach an event listener to update the styles
	if (themeToggleButton !== undefined) {
		themeToggleButton.addEventListener('click', () => {
			injectStyles(website, identifyTheme(website));
		});
	}

	// Check if page font is in favorites
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		const fav = new Map(favorites);
		const fontInFavorites = fav.has(typeface.slug);
		toggleButtonState(button, fontInFavorites);
	});

	button.addEventListener('click', () => handleButtonClick(button, typeface));

	// Update button when extension removes font
	chrome.runtime.onMessage.addListener((request) => {
		const canUpdateButton = request.message === 'removed-font' && request.font === typeface.slug;
		toggleButtonState(button, !canUpdateButton);
	});

	placeButtonOnScreen(typeface.origin.name, button);
};
