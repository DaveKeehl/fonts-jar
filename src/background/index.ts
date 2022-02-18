chrome.tabs.onActivated.addListener(() => {
	// Send message to the content_script that the active tab has changed.
	// The content_script uses this message to check whether the injected buttons and the extension storage are synced: if not, the state of the injected buttons must be updated accordingly.
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id as number, {
			message: 'changed-tab'
		});
	});
});

export {};
