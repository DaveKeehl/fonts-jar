import { build } from 'esbuild';

build({
	entryPoints: ['src/content_script/index.ts'],
	outfile: 'dist/content_script/index.js',
	bundle: true,
	minify: false,
	sourcemap: false,
	format: 'esm',
	watch: process.argv[2] === '--watch'
});
