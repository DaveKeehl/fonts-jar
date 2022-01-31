/**
 * DOM elements
 */
const fonts = document.getElementById('fonts');
const noFonts = document.getElementById('no-fonts');
const search = document.querySelector('input');

/**
 * Compare function to sort a list of typefaces based on their slug.
 * @param {*} a - The first typeface to compare.
 * @param {*} b - The second typeface to compare.
 * @returns Returns -1 whether the first slug comes first in the alphabet, 1 whether the first one comes after, else 0 whether they are the same.
 */
export const sortBySlug = (a, b) => {
	if (a[1].slug < b[1].slug) return -1;
	if (a[1].slug > b[1].slug) return 1;
	return 0;
};

/**
 * Given a typeface object, create some markup and inject it in the page.
 * @param {*} typeface - The typeface used to create the markup.
 * @returns Returns the div element containing the created markup.
 */
export const createMarkupFromTypeface = ({ variants, family, url, slug }) => {
	const font = document.createElement('div');
	font.classList.add('font');
	font.classList.add(`font-${slug}`);
	font.innerHTML = `
		<div>
			<a href="${url}" target="_blank">${family}</a>
			<p>${variants.length} variant${variants.length > 1 ? 's' : ''}</p>
		</div>
		<div class="remove">
			<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
				<rect width="256" height="256" fill="none"></rect>
				<line x1="200" y1="56" x2="56" y2="200" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
					stroke-width="16"></line>
				<line x1="200" y1="200" x2="56" y2="56" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
					stroke-width="16"></line>
			</svg>
		</div>
	`;
	fonts.appendChild(font);
	return font;
};

const handleRemoveBtnClick = (font, favorites, slug) => {
	font.style.display = 'none';
	const fav = new Map(favorites);
	fav.delete(slug);
	chrome.storage.sync.set({ favorites: Array.from(fav) });

	if (fav.size === 0) {
		noFonts.classList.remove('hidden');
		search.classList.add('hidden');
	}

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			message: 'removed-font',
			font: slug
		});
	});
};

const createMarkupForTypefaces = (favorites) => {
	favorites.sort(sortBySlug).forEach((favorite) => {
		const { slug } = favorite[1];
		const font = createMarkupFromTypeface(favorite[1]);

		const removeBtn = document.querySelector(`.font-${slug} .remove`);
		removeBtn.addEventListener('click', () => handleRemoveBtnClick(font, favorites, slug));
	});
};

/**
 * Populate the popup window using the favorite typefaces stored in chrome.storage.sync.
 */
export const populatePopup = () => {
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		if (favorites === undefined || favorites.length === 0) {
			noFonts.classList.remove('hidden');
		} else {
			search.classList.remove('hidden');

			createMarkupForTypefaces(favorites);

			search.addEventListener('keyup', (e) => {
				const text = e.target.value.trim().toLowerCase();

				const filteredFavorites = favorites.filter((favorite) => {
					const family = favorite[1].family.toLowerCase();
					return family.includes(text);
				});
				fonts.innerHTML = '';
				createMarkupForTypefaces(filteredFavorites);
			});
		}
	});
};
