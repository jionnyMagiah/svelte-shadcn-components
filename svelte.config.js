import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { defineConfig } from 'mdsx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createHighlighter } from 'shiki';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
    theme: {
        light: 'github-light',
        dark: 'github-dark'
    },
    getHighlighter: (options) =>
        createHighlighter({
            ...options,
            langs: [
                'plaintext',
                import('shiki/langs/javascript.mjs'),
                import('shiki/langs/typescript.mjs'),
                import('shiki/langs/css.mjs'),
                import('shiki/langs/svelte.mjs'),
                import('shiki/langs/shellscript.mjs'),
                import('shiki/langs/markdown.mjs')
            ]
        }),
    keepBackground: false,
    onVisitLine(node) {
        if (node.children.length === 0) {
            // @ts-expect-error - we're changing the node type
            node.children = { type: 'text', value: ' ' };
        }
    },
    onVisitHighlightedLine(node) {
        node.properties.className = ['line--highlighted'];
    },
    onVisitHighlightedChars(node) {
        node.properties.className = ['chars--highlighted'];
    }
};

export const baseRemarkPlugins = [remarkGfm];
export const baseRehypePlugins = [
    rehypeSlug,
    [rehypePrettyCode, prettyCodeOptions],
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
        adapter: adapter(),
        paths: {
            base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
        },
        alias: {
            routes: 'src/routes',
            'routes/*': 'src/routes/*',
            '$content/*': '.velite/*'
        },
        experimental: { remoteFunctions: true }
    },
    compilerOptions: { experimental: { async: true } }
};

export default config;
