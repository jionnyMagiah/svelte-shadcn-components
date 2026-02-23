import { createHighlighterCore } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const jsEngine = createJavaScriptRegexEngine();

/**
 *
 * @returns {import('shiki').HighlighterCore}
 */
export async function createHighlighter() {
    if (!globalThis.__shikiHighlighter) {
        globalThis.__shikiHighlighter = await createHighlighterCore({
            themes: [
                import('@shikijs/themes/github-light'),
                import('@shikijs/themes/github-dark')
            ],
            langs: [
                import('@shikijs/langs/typescript'),
                import('@shikijs/langs/svelte'),
                import('@shikijs/langs/css'),
                import('@shikijs/langs/json'),
                import('@shikijs/langs/bash'),
                import('@shikijs/langs/astro'),
                import('@shikijs/langs/diff')
            ],
            engine: jsEngine
        });
    }
    return globalThis.__shikiHighlighter;
}
/** @type {import('rehype-pretty-code').Options} */
export const highlightOptions = {
    theme: {
        light: 'github-light',
        dark: 'github-dark'
    },
    keepBackground: false,
    // @ts-expect-error - shh
    getHighlighter: createHighlighter,
    onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and allow empty
        // lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
    },
    onVisitHighlightedLine(node) {
        node.properties.className = ['line--highlighted'];
    },
    onVisitHighlightedChars(node) {
        node.properties.className = ['chars--highlighted'];
    }
};
