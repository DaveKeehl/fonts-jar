import type {
	Typeface,
	TypefaceTuple,
	CompareFunction,
	Sort,
	SortDirection,
	SortMethod
} from 'types/*';
import {
	fonts,
	alphabetic,
	clock,
	noFonts,
	topBar,
	sortMethodBox,
	search,
	ascending,
	descending,
	sortDirectionBox
} from './constants';
import {
	handleRemoveBtnClick,
	handleSortMethodBoxClick,
	handleSearchKeyup,
	handleSortDirectionBoxClick
} from './eventHandlers';
import { getSortFunction, isStoredSortValid } from './utils';

export const sort: Sort = {
	method: 'bySlug',
	direction: 'ascending'
};

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

// TODO: Write JSDoc
const toggleSortIcon = (icons: HTMLOrSVGImageElement[], fn: () => void) => {
	icons.forEach((icon) => icon.classList.toggle('hidden'));
	fn();
	chrome.storage.sync.set({ sort });
};

// TODO: Write JSDoc
export const toggleSortMethodIcon = () => {
	toggleSortIcon([alphabetic, clock], () => {
		if (sort.method === 'byDate') {
			sort.method = 'bySlug';
		} else if (sort.method === 'bySlug') {
			sort.method = 'byDate';
		}
	});
};

// TODO: Write JSDoc
export const toggleSortDirectionIcon = () => {
	toggleSortIcon([ascending, descending], () => {
		if (sort.direction === 'ascending') {
			sort.direction = 'descending';
		} else if (sort.direction === 'descending') {
			sort.direction = 'ascending';
		}
	});
};

/**
 * Given a pair of icons, decide which icon must be shown.
 * @param icons - A pair of svg icons.
 * @param iconToShow - The index of the icon that must be shown.
 */
const showSortIcon = (icons: [HTMLOrSVGImageElement, HTMLOrSVGImageElement], iconToShow: 0 | 1) => {
	icons.forEach((icon) => icon.classList.remove('hidden'));
	icons[iconToShow === 0 ? 1 : 0].classList.add('hidden');
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
			chrome.storage.sync.get('sort', ({ sort: storedSort }) => {
				// Only use the stored sorting information if they exist and are valid
				if (isStoredSortValid(storedSort)) {
					sort.method = storedSort.method;
					sort.direction = storedSort.direction;
				}

				showSortIcon([alphabetic, clock], sort.method === 'bySlug' ? 0 : 1);
				showSortIcon([ascending, descending], sort.direction === 'ascending' ? 0 : 1);

				createMarkupForTypefaces(favorites, getSortFunction(sort));
			});

			sortMethodBox.addEventListener('click', () => handleSortMethodBoxClick(favorites));
			sortDirectionBox.addEventListener('click', () => handleSortDirectionBoxClick(favorites));
			search.addEventListener('keyup', (event) => handleSearchKeyup(event, favorites));
		}
	});
};
