import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import removeMd from 'remove-markdown';
import { docs } from '../.velite/index.js';
import { svelteConfig} from "../svelte.config.js";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function buildDocsSearchIndex() {
    return docs.map((doc) => ({
        title: doc.title,
        href: `${svelteConfig.kit?.paths?.base}/docs/${doc.slug}`,
        description: doc.description,
        content: cleanMarkdown(doc.raw),
        section: doc.section,
        group: doc.group
    }));
}

writeFileSync(
    resolve(__dirname, '../src/routes/api/search.json'),
    JSON.stringify(buildDocsSearchIndex()),
    { flag: 'w' }
);

export function cleanMarkdown(rawMd) {
    return removeMd(rawMd, {
        replaceLinksWithURL: true,
        gfm: true,
        useImgAltText: true
    })
        .replaceAll('\n', ' ')
        .replaceAll('\t', ' ')
        .trim();
}
