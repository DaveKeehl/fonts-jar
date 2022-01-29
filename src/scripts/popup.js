// When the button is clicked, inject setPageBackgroundColor into current page
// color.addEventListener('click', async () => {
// 	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

// 	chrome.scripting.executeScript({
// 		target: { tabId: tab.id },
// 		function: setPageBackgroundColor
// 	});
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
// 	chrome.storage.sync.get('color', ({ color }) => {
// 		document.body.style.backgroundColor = color;
// 	});
// }

const container = document.getElementById('favorites');

chrome.storage.sync.get('favorites', ({ favorites }) => {
	if (favorites === undefined || favorites.length === 0) {
		const noFonts = document.getElementById('no-fonts');
		noFonts.classList.remove('hidden');
	} else {
		favorites.forEach((favorite) => {
			console.log(favorite[1]);
			const { slug, family, variants, url } = favorite[1];
			const font = document.createElement('div');
			font.classList.add('font');
			font.innerHTML = `
				<div>
					<a href="${url}" target="_blank">${family}</a>
					<p>${variants.length} variant${variants.length > 1 ? 's' : ''}</p>
				</div>
				<button id="remove">Remove</button>
			`;
			container.appendChild(font);
			const removeBtn = document.getElementById('remove');
			removeBtn.addEventListener('click', () => {
				console.log('click');
				// chrome.storage.sync.remove(slug);
			});
		});
	}
});
