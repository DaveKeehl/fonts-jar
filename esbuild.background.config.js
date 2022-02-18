import { build } from 'esbuild';

build({
	entryPoints: ['src/background/index.ts'],
	outfile: 'dist/background/index.js',
	bundle: true,
	minify: false,
	sourcemap: false,
	format: 'esm',
	watch: process.argv[2] === '--watch'
});
