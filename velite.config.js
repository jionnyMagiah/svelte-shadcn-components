import { defineConfig, s } from 'velite';

const docBaseSchema = s.object({
    title: s.string(),
    description: s.string(),
    path: s.path(),
    content: s.markdown(),
    navLabel: s.string().optional(),
    raw: s.raw(),
    toc: s.toc(),
    group: s.enum([
        'index',
        'Getting Started',
        'Components',
        'Blocks',
        'Utils',
        'Patterns'
    ]),
    section: s.enum(['index', 'Getting Started', 'Dice UI', 'Patterns'])
});

const docSchema = docBaseSchema.transform((data) => {
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
