import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';
export type Page = {
    title: string;
    url: ResolvedPathname;
    description?: string;
};
export type Group = { title: string; pages: Page[] };
export const navigation: Group[] = [
    {
        title: 'Getting Started',
        pages: [
            { title: 'Introduction', url: resolve('/introduction') },
            { title: 'Setup', url: resolve('/setup') }
        ]
    },
    {
        title: 'Dice UI Components',
        pages: [
            {
                title: 'Action Bar',
                url: resolve('/components/dice-ui/action-bar')
            },
            {
                title: 'Avatar Group',
                url: resolve('/components/dice-ui/avatar-group')
            },
            {
                title: 'Badge Overflow',
                url: resolve('/components/dice-ui/badge-overflow')
            },
            {
                title: 'Key Value',
                url: resolve('/components/dice-ui/key-value')
            },
            {
                title: 'Relative Time Card',
                url: resolve('/components/dice-ui/relative-time-card')
            },
            {
                title: 'Status',
                url: resolve('/components/dice-ui/status')
            },
            { title: 'Stepper', url: resolve('/components/dice-ui/stepper') },
            {
                title: 'Timeline',
                url: resolve('/components/dice-ui/timeline')
            }
        ]
    },
    {
        title: 'Magic UI Components',
        pages: [
            // {
            //     title: 'Relative Time Card',
            //     url: '/components/dice-ui/relative-time-card'
            // }
        ]
    },
    {
        title: 'UI TripleD',
        pages: [
            {
                title: 'Native Notification Bell',
                description:
                    'Animated notification bell with badge and ringing effect.',
                url: resolve(
                    '/components/dice-ui/ui-tripled/native-notification-bell'
                )
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

export function concat(
    separator = ' ',
    ...words: Array<string | null | undefined>
) {
    return words.filter((w) => w).join(separator);
}
