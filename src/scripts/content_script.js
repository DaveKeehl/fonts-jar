const onReady = (callback) => {
	if (document.readyState != 'loading') {
		setTimeout(callback, 1000);
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
};

const extractFontData = () => {
	const title = document.querySelector('div.sticky-header h1').textContent;
	const variants = document.querySelectorAll('span.variant__style');
	return {
		family: title,
		slug: slugify(title),
		variants: [...variants].map((variant) => variant.textContent.trim()),
		url: document.location.href
	};
};

const injectStyles = () => {
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
			transform: translateY(-1px);
		}
		
		.button__addToCollection:hover {
			color: #d2e3fc;
			background: rgba(138,180,248,.04);
			cursor: pointer;
		}
	`;
	head.appendChild(stylesheet);
};

const updateButton = (button, icon, fontInFavorites, callback = () => null) => {
	button.classList[fontInFavorites ? 'add' : 'remove']('active');
	button.innerText = fontInFavorites ? 'Remove from collection' : 'Add to collection';
	icon.textContent = fontInFavorites ? '-' : '+';
	button.appendChild(icon);
	callback();
};

const createButton = () => {
	const button = document.createElement('button');
	button.innerText = 'Add to collection';
	button.classList.add('button__addToCollection');

	const icon = document.createElement('span');
	icon.textContent = '+';
	button.appendChild(icon);

	return [button, icon];
};

const placeButtonOnScreen = (button) => {
	const downloadButtonStd = document.querySelector('button.sticky-header__cta-button');
	downloadButtonStd.insertAdjacentElement('beforeBegin', button);
};

const injectMarkup = (typeface) => {
	const [button, icon] = createButton();

	// Fix button style when placed in collapsed header
	document.addEventListener('scroll', () => {
		button.classList[window.scrollY > 130 ? 'add' : 'remove']('collapsed-header');
	});

	// Check if page font is in favorites
	chrome.storage.sync.get('favorites', ({ favorites }) => {
		const fav = new Map(favorites);
		const fontInFavorites = fav.has(typeface.slug);
		updateButton(button, icon, fontInFavorites);
	});

	// React to click events on new added button
	button.addEventListener('click', () => {
		chrome.storage.sync.get('favorites', ({ favorites }) => {
			const fav = new Map(favorites);
			const fontInFavorites = fav.has(typeface.slug);
			updateButton(button, icon, !fontInFavorites, () => {
				if (!fontInFavorites) {
					console.log(typeface);
					typeface['added_at'] = Date.now();
					console.log(typeface);
					fav.set(typeface.slug, typeface);
				} else {
					fav.delete(typeface.slug);
				}
			});
			chrome.storage.sync.set({ favorites: Array.from(fav) });
		});
	});

	// Update button when extension removes font
	chrome.runtime.onMessage.addListener((request, sendResponse) => {
		const canUpdateButton = request.message === 'removed-font' && request.font === typeface.slug;
		updateButton(button, icon, !canUpdateButton);
	});

	placeButtonOnScreen(button);
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
	injectStyles();
	injectMarkup(extractFontData());

	// chrome.storage.sync.get(null, function (data) {
	// 	console.info('Storage:', data);
	// });
});
