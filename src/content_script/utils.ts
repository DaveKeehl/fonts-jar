import type { Typeface } from 'types';

export const onReady = (callback: () => unknown) => {
	if (document.readyState != 'loading') {
		setTimeout(callback, 1000);
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
};

export const extractFontData = (): Typeface => {
	const titleElement = document.querySelector('div.sticky-header h1') as HTMLHeadingElement;
	const title = titleElement.textContent as string;
	const variants = document.querySelectorAll<HTMLSpanElement>('span.variant__style');
	const variableAxes = document.querySelectorAll<HTMLDivElement>(
		'div.variable-axes__preview div.axis-container'
	);

	return {
		family: title,
		slug: slugify(title),
		styles: [...variants]
			.map((variant) => (variant.textContent !== null ? variant.textContent.trim() : ''))
			.filter((variant) => variant !== ''),
		variableAxes: variableAxes !== undefined ? variableAxes.length : 0,
		origin: {
			name: 'Google Fonts',
			url: document.location.href
		},
		added_at: ''
	};
};

export const injectStyles = () => {
	const head = document.querySelector('head') as HTMLHeadElement;
	const stylesheet = document.createElement('style');
	stylesheet.setAttribute('data-extension', 'fonts-jar');
	stylesheet.innerHTML = `
		.button__addToWishlist {
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

		.button__addToWishlist.collapsed-header {
			margin-right: 1rem;
		}

		.button__addToWishlist.active,
		.button__addToWishlist.active:hover {
			background: #354d70;
		}
		
		.button__addToWishlist span {
			font-size: 24px;
			height: 20px;
			display: flex;
			align-items: center;
			transform: translateY(-1px);
		}
		
		.button__addToWishlist:hover {
			color: #d2e3fc;
			background: rgba(138,180,248,.04);
			cursor: pointer;
		}
	`;
	head.appendChild(stylesheet);
};

export const updateButton = (
	button: HTMLButtonElement,
	icon: HTMLSpanElement,
	fontInFavorites: boolean,
	fn: () => unknown = () => null
) => {
	button.classList.toggle('active', fontInFavorites);
	button.innerText = fontInFavorites ? 'Remove from wishlist' : 'Add to wishlist';
	icon.textContent = fontInFavorites ? '-' : '+';
	button.appendChild(icon);
	fn();
};

export const createButton = (): [HTMLButtonElement, HTMLSpanElement] => {
	const button = document.createElement('button');
	button.innerText = 'Add to collection';
	button.classList.add('button__addToWishlist');

	const icon = document.createElement('span');
	icon.textContent = '+';
	button.appendChild(icon);

	return [button, icon];
};

export const placeButtonOnScreen = (button: HTMLButtonElement) => {
	const downloadButtonStd = document.querySelector(
		'button.sticky-header__cta-button'
	) as HTMLButtonElement;
	downloadButtonStd.insertAdjacentElement('beforebegin', button);
};

export const injectMarkup = (typeface: Typeface) => {
	const [button, icon] = createButton();

	// Fix button style when placed in collapsed header
	document.addEventListener('scroll', () => {
		button.classList.toggle('collapsed-header', window.scrollY > 130);
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
	});

	// Update button when extension removes font
	chrome.runtime.onMessage.addListener((request) => {
		const canUpdateButton = request.message === 'removed-font' && request.font === typeface.slug;
		updateButton(button, icon, !canUpdateButton);
	});

	placeButtonOnScreen(button);
};

export const slugify = (text: string) =>
	text
		.split(/[^A-Za-z]/g)
		.map((el) => el.toLowerCase())
		.map((el, idx) => {
			if (idx === 0) return el;
			return el[0].toUpperCase() + el.slice(1);
		})
		.join('');
