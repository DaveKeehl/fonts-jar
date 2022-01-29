let previousUrl = '';
const observer = new MutationObserver(function (mutations) {
	if (document.location.href !== previousUrl) {
		previousUrl = document.location.href;
		console.log(`URL changed to ${document.location.href}`);
	}
});
const config = { subtree: true, childList: true };
observer.observe(document, config);
