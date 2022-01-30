const container = document.getElementById('favorites');

chrome.storage.sync.get('favorites', ({ favorites }) => {
	if (favorites === undefined || favorites.length === 0) {
		const noFonts = document.getElementById('no-fonts');
		noFonts.classList.remove('hidden');
	} else {
		favorites
			.sort((a, b) => {
				console.log(a, b);
				if (a[1].slug < b[1].slug) return -1;
				if (a[1].slug > b[1].slug) return 1;
				return 0;
			})
			.forEach((favorite) => {
				console.log(favorite[1]);
				const { slug, family, variants, url } = favorite[1];
				const font = document.createElement('div');
				font.classList.add('font');
				font.innerHTML = `
				<div>
					<a href="${url}" target="_blank">${family}</a>
					<p>${variants.length} variant${variants.length > 1 ? 's' : ''}</p>
				</div>
				<button id="remove-${slug}">Remove</button>
			`;
				container.appendChild(font);
				const removeBtn = document.getElementById(`remove-${slug}`);
				removeBtn.addEventListener('click', () => {
					console.log('click');
					const fav = new Map(favorites);
					fav.delete(slug);
					const updated = Array.from(fav);
					console.log(updated);
					chrome.storage.sync.set({ favorites: updated });
				});
			});
	}
});
