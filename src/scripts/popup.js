const sortBySlug = (a, b) => {
	if (a[1].slug < b[1].slug) return -1;
	if (a[1].slug > b[1].slug) return 1;
	return 0;
};

const injectMarkup = ({ variants, family, url, slug }) => {
	const container = document.getElementById('fonts');
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
	container.appendChild(font);
};

chrome.storage.sync.get('favorites', ({ favorites }) => {
	console.log(favorites);

	if (favorites === undefined || favorites.length === 0) {
		const noFonts = document.getElementById('no-fonts');
		noFonts.classList.remove('hidden');
	} else {
		favorites.sort(sortBySlug).forEach((favorite) => {
			const { slug } = favorite[1];
			injectMarkup(favorite[1]);

			const removeBtn = document.querySelector(`.font-${slug} .remove`);
			removeBtn.addEventListener('click', () => {
				font.style.display = 'none';
				const fav = new Map(favorites);
				fav.delete(slug);
				chrome.storage.sync.set({ favorites: Array.from(fav) });

				if (fav.size === 0) {
					const noFonts = document.getElementById('no-fonts');
					noFonts.classList.remove('hidden');
				}

				chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {
						message: 'removed-font',
						font: slug
					});
				});
			});
		});
	}
});

const search = document.querySelector('input');
console.log(search);
search.addEventListener('change', (e) => {
	console.log(e.target.value);
});
