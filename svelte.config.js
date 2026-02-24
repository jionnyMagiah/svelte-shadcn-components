import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { defineConfig } from 'mdsx';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { highlightOptions } from './shiki.config.js';

export const baseRemarkPlugins = [remarkGfm];
export const baseRehypePlugins = [
    rehypeSlug,
    [rehypePrettyCode, highlightOptions],
    rehypeAutolinkHeadings
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [
        mdsx(
            defineConfig({
                extensions: ['.md'],
                remarkPlugins: [...baseRemarkPlugins],
                // @ts-expect-error shh
                rehypePlugins: [...baseRehypePlugins],
                blueprints: {
                    default: {
                        path: './src/lib/blueprints/default/blueprint.svelte'
                    }
                }
            })
        ),
        vitePreprocess()
    ],
    extensions: ['.svelte', '.md'],
    kit: {
        prerender: { handleHttpError: 'ignore', handleUnseenRoutes: 'ignore' },
        adapter: adapter(),
        paths: {
            base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
        },
        alias: {
            routes: 'src/routes',
            'routes/*': 'src/routes/*',
            '$content/*': '.velite/*',
            '$preview/*': 'src/code-preview/*'
        },
        experimental: { remoteFunctions: true }
    },
    compilerOptions: { experimental: { async: true } }
};

export default config;
export {config as svelteConfig}
