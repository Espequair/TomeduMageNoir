import adapterGhpages from "svelte-adapter-ghpages";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapterGhpages({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
		}),
        paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
        prerender: {
            handleHttpError : 'warn',
            entries : [
                "/",
                "/collection",
                "/card/Tourment-d-epines",
              ]
        }
	}
};

export default config;
