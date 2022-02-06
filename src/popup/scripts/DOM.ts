import type { Typeface, TypefaceTuple, CompareFunction, SortMethod } from 'types/*';
import { fonts, alphabetic, clock, noFonts, topBar, sortBox, search } from './constants';
import { handleRemoveBtnClick, handleSortBoxClick, handleSearchKeyup } from './eventHandlers';
import { getSortFunction } from './utils';

export let sortMethod: SortMethod = 'bySlug';

/**
 * Given a typeface object, create some markup and inject it in the page.
 * @param typeface - The typeface used to create the markup.
 * @returns Returns the div element containing the created markup.
 */
export const createMarkupFromTypeface = ({
	styles,
	family,
	origin,
	slug,
	variableAxes
}: Typeface) => {
	const font = document.createElement('div');
	const stylesText = `${styles.length} style${styles.length > 1 ? 's' : ''}`;
	const variableAxesText = variableAxes > 0 ? `(variable - ${variableAxes} axes)` : '';

	font.classList.add('font');
	font.classList.add(`font-${slug}`);
	font.innerHTML = `
		<div>
			<a href="${origin.url}" target="_blank">${family}</a>
			<p>${stylesText} ${variableAxesText}</p>
		</div>
		<div class="remove">
			<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
				<rect width="256" height="256" fill="none"></rect>
				<line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
					stroke-width="24"></line>
				<line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
					stroke-width="24"></line>
			</svg>
		</div>
	`;
	fonts.appendChild(font);

	return font;
};

/**
 * Function that creates markup for an array of favorite typefaces.
 * @param favorites - The array of typefaces you want some markup to be created for.
 */
export const createMarkupForTypefaces = (
	favorites: TypefaceTuple[],
	compareFunction: CompareFunction
) => {
	fonts.innerHTML = '';
	const sortedFavorites = [...favorites].sort(compareFunction);

	sortedFavorites.forEach((favorite) => {
		const { slug } = favorite[1];
		const font = createMarkupFromTypeface(favorite[1]);

		const removeBtn = document.querySelector(`.font-${slug} .remove`) as HTMLButtonElement;
		removeBtn.addEventListener('click', () => handleRemoveBtnClick(font, favorites, slug));
	});
};

/**
 * Toggles the sort icons and returns the name of currently active one.
 */
export const toggleSortIcon = () => {
	alphabetic.classList.toggle('hidden');
	clock.classList.toggle('hidden');

	if (sortMethod === 'byDate') {
		sortMethod = 'bySlug';
	} else if (sortMethod === 'bySlug') {
		sortMethod = 'byDate';
	}
	chrome.storage.sync.set({ sort: sortMethod });
};

const showSortIcon = (icon: 'alphabetic' | 'clock') => {
	alphabetic.classList.remove('hidden');
	clock.classList.remove('hidden');

	if (icon === 'alphabetic') {
		console.log('showing alphabetic icon');
		clock.classList.add('hidden');
	} else if (icon === 'clock') {
		console.log('showing clock icon');
		alphabetic.classList.add('hidden');
	}
};

/**
 * Populate the popup window when opened.
 */
export const populatePopup = () => {
	chrome.storage.sync.get(null, (data) => {
		console.info('Storage:', data);
	});

	chrome.storage.sync.get('favorites', ({ favorites }) => {
		if (favorites === undefined || favorites.length === 0) {
			noFonts.classList.remove('hidden');
		} else {
			topBar.classList.remove('hidden');

			// When popup is opened, retrieve from storage the lastly used sort method
			chrome.storage.sync.get('sort', ({ sort }) => {
				sortMethod = sort;

				if (sort === 'byDate') {
					showSortIcon('clock');
				} else {
					showSortIcon('alphabetic');
				}

				createMarkupForTypefaces(favorites, getSortFunction(sort));
			});

			sortBox.addEventListener('click', () => handleSortBoxClick(favorites));
			search.addEventListener('keyup', (event) => handleSearchKeyup(event, favorites));
		}
	});
};
