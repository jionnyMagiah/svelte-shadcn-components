import { fileURLToPath } from 'node:url';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { docs } from '../.velite/index.js';
import removeMd from 'remove-markdown';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function buildDocsSearchIndex() {
    return docs.map((doc) => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
        description: doc.description,
        content: cleanMarkdown(doc.raw),
        category: doc.section
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
		useImgAltText: true,
	})
		.replaceAll("\n", " ")
		.replaceAll("\t", " ")
		.trim();
}