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

/**
 * Given some CSS, get a minified version of it.
 * @param css - The CSS to be minified.
 * @returns The minified CSS.
 */
export const minify = (css: string) =>
	css
		.replace(/([^0-9a-zA-Z.#])\s+/g, '$1')
		.replace(/\s([^0-9a-zA-Z.#]+)/g, '$1')
		.replace(/;}/g, '}')
		.replace(/\/\*.*?\*\//g, '');

/**
 * Generic function whose goal is to run some code on the first valid element from an array to candidate elements.
 * @param candidates - The array of candidates. The function will stop iterating at the first candidate that results in a valid element as output of the onCandidateIteration callback function.
 * @param onCandidateIteration - Callback function whose output is used to determine the validitiy of a candidate elemement.
 * @param onTruthyCandidate - Callback function whose goal is to produce some output based on the valid candidate element.
 * @param onCandidateValidation - Callback function that checks whether a candidate element is valid or not.
 * @returns The output of the onTruthyCandidate callback function.
 */
export const useFirstValidCandidate = <T, K, V>(
	candidates: T[],
	onCandidateIteration: (candidate: T) => K,
	onTruthyCandidate: (candidate: K) => V,
	onCandidateValidation: (candidate: K) => boolean
) => {
	let res;

	for (const candidate of candidates) {
		const element = onCandidateIteration(candidate);

		if (onCandidateValidation(element)) {
			res = onTruthyCandidate(element);
			break;
		}
	}

	return res as V;
};
