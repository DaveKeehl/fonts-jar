// chrome.runtime.onInstalled.addListener(() => {
// 	chrome.storage.sync.set({ favorites: [] });
// });

chrome.tabs.onActivated.addListener((activeInfo) => {
	console.log(activeInfo);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => console.log(tabId, changeInfo, tab));
