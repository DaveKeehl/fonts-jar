<script>
	async function getStorageValuePromise(key) {
		return new Promise((resolve) => {
			chrome.storage.sync.get(key, resolve);
		});
	}

	const promise = getStorageValuePromise('favorites')
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await promise then value}
	<p>{value}</p>
{/await}