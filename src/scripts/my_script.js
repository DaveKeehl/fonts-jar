const onReady = (fn) => {
	if (document.readyState != 'loading') {
		setTimeout(fn, 1000);
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};

const slugify = (text) =>
	text
		.split(/[^A-Za-z]/g)
		.map((el) => el.toLowerCase())
		.map((el, idx) => {
			if (idx === 0) return el;
			return el[0].toUpperCase() + el.slice(1);
		})
		.join('');

onReady(() => {
	const title = document.querySelector('div.sticky-header h1').textContent;
	const variants = document.querySelectorAll('span.variant__style');

	const typeface = {
		family: title,
		slug: slugify(title),
		variants: [...variants].map((variant) => variant.textContent.trim()),
		url: document.location.href
	};

	const head = document.querySelector('head');
	const stylesheet = document.createElement('style');
	stylesheet.setAttribute('data-extension', 'google-fonts-collections');
	stylesheet.innerHTML = `
		.button__addToCollection {
			display: flex;
			flex-direction: row-reverse;
			justify-content: center;
			align-items: center;
			gap: 0.5rem;
			background: none;
			border: 1px solid #8ab4f8;
			color: #8ab4f8;
			padding: 7px 24px;
			border-radius: 0.25rem;
			font-family: inherit;
			font-size: 14px;
			font-weight: 500;
			margin-right: -2rem;
		}

		.button__addToCollection.collapsed-header {
			margin-right: 1rem;
		}

		.button__addToCollection.active,
		.button__addToCollection.active:hover {
			background: #354d70;
		}
		
		.button__addToCollection span {
			font-size: 24px;
			height: 20px;
			display: flex;
			align-items: center;
			transform = translateY(-1px);
		}
		
		.button__addToCollection:hover {
			color: #d2e3fc;
			background: rgba(138,180,248,.04);
			cursor: pointer;
		}
	`;
	head.appendChild(stylesheet);

	const button = document.createElement('button');
	button.innerText = 'Add to collection';
	button.classList.add('button__addToCollection');

	document.addEventListener('scroll', () => {
		if (window.scrollY > 130) {
			button.classList.add('collapsed-header');
		} else {
			button.classList.remove('collapsed-header');
		}
	});

	const icon = document.createElement('span');
	icon.textContent = '+';
	button.appendChild(icon);

	// Check if page font is in favorites
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		const fav = new Map(favorites);

		if (fav.has(typeface.slug)) {
			button.classList.add('active');
			button.innerText = 'Remove from collection';
			icon.textContent = '-';
			button.appendChild(icon);
		} else {
			button.classList.remove('active');
			button.innerText = 'Add to collection';
			icon.textContent = '+';
			button.appendChild(icon);
		}
	});

	// Deal
	button.addEventListener('click', () => {
		chrome.storage.sync.get('favorites', ({ favorites }) => {
			const fav = new Map(favorites);

			if (!fav.has(typeface.slug)) {
				console.log('adding to favorites');
				fav.set(typeface.slug, typeface);
				button.classList.add('active');
				button.innerText = 'Remove from collection';
				icon.textContent = '-';
				button.appendChild(icon);
			} else {
				console.log('removing from favorites');
				fav.delete(typeface.slug);
				button.classList.remove('active');
				button.innerText = 'Add to collection';
				icon.textContent = '+';
				button.appendChild(icon);
			}

			const updated = Array.from(fav);
			chrome.storage.sync.set({ favorites: updated });
		});
	});

	const downloadButtonStd = document.querySelector(
		'button.sticky-header__cta-button'
	);
	downloadButtonStd.insertAdjacentElement('beforeBegin', button);

	chrome.storage.sync.get(null, function (data) {
		console.info('Storage:', data);
	});
});
