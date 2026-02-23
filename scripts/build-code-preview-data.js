import { fileURLToPath } from 'node:url';
import {
    writeFileSync,
    readdir,
    readFile,
    readdirSync,
    readFileSync
} from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { docs } from '../.velite/index.js';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { createHighlighter, highlightOptions } from '../shiki.config.js';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeShiki from '@shikijs/rehype';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { baseRehypePlugins, baseRemarkPlugins } from '../svelte.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export async function buildCodePreviewData(dirPath) {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    const result = {};

    for (const entry of entries) {
        if (!entry.isFile()) continue;

        const fullPath = join(dirPath, entry.name);
        const ext = extname(entry.name);
        const content = readFileSync(fullPath, 'utf-8').trim();
        const highlighted = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypePrettyCode, { ...highlightOptions })
            .use(rehypeStringify)
            .process(
                `\`\`\`${ext.slice(1)} showLineNumbers
${content}
\`\`\``
            );

        result[entry.name.replace(ext, '')] = {
            highlighted: String(highlighted),
            path: './snippet/' + entry.name,
            extension: ext
        };
    }

    return result;
}

console.log('Building code-preview data');

const data = await buildCodePreviewData('src/lib/code-preview/snippet');

writeFileSync(
    resolve(__dirname, '../src/routes/api/code-preview.json'),
    JSON.stringify(data, null, 4),
    { flag: 'w', encoding: 'utf-8' }
);
