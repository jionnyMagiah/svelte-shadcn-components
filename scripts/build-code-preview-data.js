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

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export function buildCodePreviewData(dirPath) {
    const entries = readdirSync(dirPath, { withFileTypes: true });
    const result = {};

    for (const entry of entries) {
        if (!entry.isFile()) continue;

        const fullPath = join(dirPath, entry.name);
        const ext = extname(entry.name);
        const content = readFileSync(fullPath, 'utf-8');

        result[entry.name.replace(ext, '')] = {
            content,
            path: './snippet/' + entry.name,
            extension: ext
        };
    }

    return result;
}

console.log('Building code-preview data');

const data = buildCodePreviewData('src/lib/code-preview/snippet');

writeFileSync(
    resolve(__dirname, '../src/routes/api/code-preview.json'),
    JSON.stringify(data, null, 4),
    { flag: 'w', encoding: 'utf-8' }
);
