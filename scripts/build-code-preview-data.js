import {
    readdirSync,
    readFileSync,
    writeFileSync
} from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { highlightOptions } from '../shiki.config.js';

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
            content,
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
