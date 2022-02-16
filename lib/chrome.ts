/**
 * Utility function to read from the chrome synced storage.
 * @param key - The key of the storage item you want to access.
 * @returns A promise.
 */
export const readSyncStorage = async (key: string | null) => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(key, (data) => {
			if (key === null) {
				resolve(data);
			} else if (key !== null && key !== undefined) {
				resolve(data[key]);
			} else {
				reject();
			}
		});
	});
};

/**
 * Utility function to write to the chrome synced storage.
 * @param data - What you want to store.
 * @returns A promise.
 */
export const writeSyncStorage = async (data: { [key: string]: unknown }) => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.set(data, () => {
			if (data !== undefined) {
				resolve(data);
			} else {
				reject();
			}
		});
	});
};
