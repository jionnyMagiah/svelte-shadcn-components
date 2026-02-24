import { defineConfig, s } from 'velite';
import { svelteConfig} from "./svelte.config.js";

const docBaseSchema = s.object({
    title: s.string(),
    description: s.string(),
    path: s.path(),
    content: s.markdown(),
    navLabel: s.string().optional(),
    raw: s.raw(),
    toc: s.toc(),
    group: s.enum(['Getting Started', 'Components', 'Blocks', 'Utils']),
    section: s.enum(['Getting Started', 'Dice UI']),
    credits: s.object({ title: s.string(), url: s.string() }).optional()
});

const docSchema = docBaseSchema.transform((data) => {
    return {
        ...data,
        slug: data.path,
        slugFull: `${svelteConfig.kit?.paths?.base}/${data.path}`
    };
});

const indexBaseSchema = s.object({
    title: s.string(),
    path: s.path(),
    content: s.markdown(),
    navLabel: s.string().optional(),
    raw: s.raw(),
    toc: s.toc()
});

const indexSchema = indexBaseSchema.transform((data) => {
    return {
        ...data,
        slug: data.path,
        slugFull: `${svelteConfig.kit?.paths?.base}/${data.path}`
    };
});

export default defineConfig({
    root: './src/content',
    collections: {
        docs: {
            name: 'Doc',
            pattern: './**/*[!index].md',
            schema: docSchema
        },
        index: {
            name: 'Index',
            pattern: './**/index.md',
            schema: indexSchema
        }
    }
});
