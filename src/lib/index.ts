import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';

export const componentData = {
    'dice-ui': {
        'action-bar': {
            title: 'Action Bar',
            desc: 'A floating action bar that appears at the bottom or top of the viewport to display contextual actions for selected items.'
        },
        'avatar-group': {
            title: 'Avatar Group',
            desc: 'A component that arranges avatars with overlapping visual effects for displaying multiple users or items.'
        },
        'badge-overflow': {
            title: 'Badge Overflow',
            desc: 'A component that intelligently manages badge overflow by measuring available space and displaying only what fits with an overflow indicator.'
        },
        'key-value': {
            title: 'Key Value',
            desc: 'A dynamic input component for managing key-value pairs with paste support and validation.'
        },
        'relative-time-card': {
            title: 'Relative Time Card',
            desc: 'A hover card that displays relative time relative to local time with timezone information.'
        },
        status: {
            title: 'Status',
            desc: 'A flexible status indicator component with animated ping effect and color variants for displaying system states, user presence, and service health.'
        },
        stat: {
            title: 'Stat',
            desc: 'A flexible component for displaying key metrics and statistics with support for trends, indicators, and descriptions.'
        },
        stepper: {
            title: 'Stepper',
            desc: 'A component that guides users through a multi-step process with clear visual progress indicators.'
        },
        timeline: {
            title: 'Timeline',
            desc: 'A flexible timeline component for displaying chronological events with support for different orientations, RTL layouts, and visual states.'
        }
    },
    'ui-tripled': {
        'native-notification-bell': {
            title: 'Native Notification Bell',
            desc: 'Animated notification bell with badge and ringing effect.'
        }
    },
    utils: {
        'visually-hidden-input': {
            title: 'Visually Hidden Input',
            desc: 'A hidden input that remains accessible to assistive technology and maintains form functionality.'
        }
    }
};

export type Page = {
    title: string;
    url: ResolvedPathname;
    desc?: string;
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
                ...componentData['dice-ui']['action-bar'],
                url: resolve('/components/dice-ui/action-bar')
            },
            {
                ...componentData['dice-ui']['avatar-group'],
                url: resolve('/components/dice-ui/avatar-group')
            },
            {
                ...componentData['dice-ui']['badge-overflow'],
                url: resolve('/components/dice-ui/badge-overflow')
            },
            {
                ...componentData['dice-ui']['key-value'],
                url: resolve('/components/dice-ui/key-value')
            },
            {
                ...componentData['dice-ui']['relative-time-card'],
                url: resolve('/components/dice-ui/relative-time-card')
            },
            {
                ...componentData['dice-ui']['stat'],
                url: resolve('/components/dice-ui/stat')
            },
            {
                ...componentData['dice-ui']['status'],
                url: resolve('/components/dice-ui/status')
            },
            {
                ...componentData['dice-ui']['stepper'],
                url: resolve('/components/dice-ui/stepper')
            },
            {
                ...componentData['dice-ui']['timeline'],
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
                ...componentData['ui-tripled']['native-notification-bell'],
                url: resolve('/components/ui-tripled/native-notification-bell')
            }
        ]
    },

    {
        title: 'Utils',
        pages: [
            {
                ...componentData['utils']['visually-hidden-input'],
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
