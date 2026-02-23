import { defineConfig, s } from 'velite';

const baseSchema = s.object({
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

const docSchema = baseSchema.transform((data) => {
    return {
        ...data,
        slug: data.path,
        slugFull: `/${data.path}`
    };
});

export default defineConfig({
    root: './src/content',
    collections: {
        docs: {
            name: 'Doc',
            pattern: './**/*.md',
            schema: docSchema
        }
    }
});
