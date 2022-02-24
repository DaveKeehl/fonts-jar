import {
	getCollections,
	isImportedDataValid,
	isString,
	isStringArray,
	hasObjectKey,
	hasLegalAddedAt,
	hasLegalCollections,
	hasLegalFamily,
	hasLegalVariableAxes,
	hasLegalSlug,
	hasLegalStyles,
	isTypefaceTuple,
	hasLegalOrigin,
	isValidTypeface
} from 'lib/chrome';
import {
	validTypefaces,
	invalidAddedAt,
	invalidCollections,
	invalidFamily,
	invalidOrigin,
	invalidSlug,
	invalidStyles,
	invalidVariableAxes,
	notMatchingSlugs
} from '../mock/favorites';

test('getCollections', () => {
	expect(getCollections(validTypefaces)).toEqual(expect.arrayContaining(['body', 'serif']));
});

test('isString', () => {
	expect(isString('hello world')).toBe(true);
	expect(isString(0)).toBe(false);
	expect(isString(null)).toBe(false);
});

test('isStringArray', () => {
	expect(isStringArray(['hello', 'world'])).toBe(true);
	expect(isStringArray(['hello', 1])).toBe(false);
	expect(isStringArray(null)).toBe(false);
});

test('hasObjectKey', () => {
	expect(hasObjectKey({ A: 'value A', B: 'value B' }, 'A')).toBe('value A');
	expect(hasObjectKey({ A: 'value A', B: 'value B' }, 'B')).toBe('value B');
	expect(hasObjectKey({ A: 'value A', B: 'value B' }, 'C')).toBe(false);
	expect(hasObjectKey('hello world', 'A')).toBe(undefined);
});

test('hasLegalAddedAt', () => {
	expect(hasLegalAddedAt({ A: 'value A' })).toBe(false);
	expect(hasLegalAddedAt(null)).toBe(false);
	expect(hasLegalAddedAt('')).toBe(false);
	expect(
		hasLegalAddedAt({
			added_at: 'Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)'
		})
	).toBe(true);
	expect(hasLegalAddedAt({ added_at: 'today' })).toBe(true);
});

test('hasLegalCollections', () => {
	expect(hasLegalCollections({ A: 'value A' })).toBe(false);
	expect(hasLegalCollections({ collections: ['hello', 'world'] })).toBe(true);
	expect(hasLegalCollections({ collections: ['hello', 0] })).toBe(false);
	expect(hasLegalCollections({ collections: [] })).toBe(true);
});

test('hasLegalFamily', () => {
	expect(hasLegalFamily({ A: 'value A' })).toBe(false);
	expect(hasLegalFamily({ family: 'Poppins' })).toBe(true);
	expect(hasLegalFamily({ family: 0 })).toBe(false);
});

test('hasLegalOrigin', () => {
	expect(hasLegalOrigin({ A: 'value A' })).toBe(false);
	expect(hasLegalOrigin({ origin: 'value A' })).toBe(false);
	expect(hasLegalOrigin({ origin: {} })).toBe(false);
	expect(hasLegalOrigin({ origin: { name: '' } })).toBe(false);
	expect(hasLegalOrigin({ origin: { url: '' } })).toBe(false);
	expect(hasLegalOrigin({ origin: { name: '', url: '' } })).toBe(false);
	expect(
		hasLegalOrigin({
			origin: { name: 'google fonts', url: 'https://fonts.google.com/specimen/Poppins' }
		})
	).toBe(false);
	expect(
		hasLegalOrigin({
			origin: { name: 'Google Fonts', url: 'https://google.com' }
		})
	).toBe(false);
	expect(
		hasLegalOrigin({
			origin: { name: 'Adobe Fonts', url: 'https://fonts.adobe.com/fonts/new-order' }
		})
	).toBe(false);
	expect(
		hasLegalOrigin({
			origin: { name: 'Google Fonts', url: 'https://fonts.google.com/specimen/Poppins' }
		})
	).toBe(true);
	expect(
		hasLegalOrigin({
			origin: { name: 'Google Fonts', url: 'https://fonts.google.com/specimen/Open+Sans' }
		})
	).toBe(true);
});

test('hasLegalSlug', () => {
	expect(hasLegalSlug({ A: 'value A' }, 'openSans')).toBe(false);
	expect(hasLegalSlug({ slug: 'openSans' }, 'poppins')).toBe(false);
	expect(hasLegalSlug({ slug: 'openSans' }, 'openSans')).toBe(true);
});

test('hasLegalStyles', () => {
	expect(hasLegalStyles({ A: 'value A' })).toBe(false);
	expect(hasLegalStyles({ styles: null })).toBe(false);
	expect(hasLegalStyles({ styles: [] })).toBe(false);
	expect(hasLegalStyles({ styles: ['style 1'] })).toBe(true);
	expect(hasLegalStyles({ styles: ['style 1', 'style 2'] })).toBe(true);
});

test('hasLegalVariableAxes', () => {
	expect(hasLegalVariableAxes({ A: 'value A' })).toBe(false);
	expect(hasLegalVariableAxes({ variableAxes: 3 })).toBe(true);
	expect(hasLegalVariableAxes({ variableAxes: 0 })).toBe(true);
	expect(hasLegalVariableAxes({ variableAxes: -1 })).toBe(false);
});

test('isTypefaceTuple', () => {
	expect(isTypefaceTuple([])).toBe(false);
	expect(isTypefaceTuple(['slug', {}])).toBe(true);
	expect(isTypefaceTuple([0, {}])).toBe(false);
	expect(isTypefaceTuple([{}, 'slug'])).toBe(false);
	expect(isTypefaceTuple([null, {}])).toBe(false);
	expect(isTypefaceTuple([null, null])).toBe(false);
	expect(isTypefaceTuple([{}, null])).toBe(false);
	expect(isTypefaceTuple([[], null])).toBe(false);
	expect(isTypefaceTuple([null, []])).toBe(false);
	expect(isTypefaceTuple([[], []])).toBe(false);
});

test('isValidTypeface', () => {
	expect(isValidTypeface(['slug', null])).toBe(false);
	expect(isValidTypeface(['slug', {}])).toBe(false);
	validTypefaces.forEach((typeface) => expect(isValidTypeface(typeface)).toBe(true));
});

test('isImportedDataValid', () => {
	expect(isImportedDataValid(validTypefaces)).toBe(true);
	expect(isImportedDataValid([])).toBe(false);
	expect(isImportedDataValid(invalidAddedAt)).toBe(false);
	expect(isImportedDataValid(invalidCollections)).toBe(false);
	expect(isImportedDataValid(invalidFamily)).toBe(false);
	expect(isImportedDataValid(invalidOrigin)).toBe(false);
	expect(isImportedDataValid(invalidSlug)).toBe(false);
	expect(isImportedDataValid(notMatchingSlugs)).toBe(false);
	expect(isImportedDataValid(invalidStyles)).toBe(false);
	expect(isImportedDataValid(invalidVariableAxes)).toBe(false);
});
