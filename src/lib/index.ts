import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';

export const navigation: {
    title: string;
    pages: { title: string; url: ResolvedPathname }[];
}[] = [
    {
        title: 'Getting Started',
        pages: [
            { title: 'Introduction', url: resolve('/introduction') },
            { title: 'Setup', url: resolve('/setup') }
        ]
    },
    {
        title: 'Components',
        pages: [
            { title: 'Action Bar', url: resolve('/components/action-bar') },
            { title: 'Avatar Group', url: resolve('/components/avatar-group') },
            {
                title: 'Badge Overflow',
                url: resolve('/components/badge-overflow')
            },
            { title: 'Key Value', url: resolve('/components/key-value') },
            {
                title: 'Relative Time Card',
                url: resolve('/components/relative-time-card')
            },
            {
                title: 'Status',
                url: resolve('/components/status')
            }
        ]
    },
    {
        title: 'Utils',
        pages: [
            {
                title: 'Visually Hidden Input',
                url: resolve('/utils/visually-hidden-input')
            }
        ]
    }
];
