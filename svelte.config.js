import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import { resolve } from "path";

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	vite: {
		resolve: {
			alias: {
				$data: resolve("./src/data"),
			},
		},
	},
	kit: {
		adapter: vercel()
	},
};

export default config;
