/**
 * Given a string, create a camelcase slug.
 * @param text - The string to slugify.
 * @returns The slug
 */
export const slugify = (text: string) =>
	text
		.split(/[^A-Za-z]/g)
		.map((el) => el.toLowerCase())
		.map((el, idx) => {
			if (idx === 0) return el;
			return el[0].toUpperCase() + el.slice(1);
		})
		.join('');

export const minify = (css: string) =>
	css
		.replace(/([^0-9a-zA-Z.#])\s+/g, '$1')
		.replace(/\s([^0-9a-zA-Z.#]+)/g, '$1')
		.replace(/;}/g, '}')
		.replace(/\/\*.*?\*\//g, '');
