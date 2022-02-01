import { build } from 'esbuild';

build({
	entryPoints: ['src/popup/scripts/index.ts'],
	outfile: 'dist/popup/scripts/index.js',
	bundle: true,
	minify: false,
	sourcemap: false,
	format: 'esm',
	watch: process.argv[2] === '--watch'
});
