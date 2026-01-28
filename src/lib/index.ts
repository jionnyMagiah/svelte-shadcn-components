import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';
import { Blocks, Package, Plus, Puzzle, Route, Wrench } from '@lucide/svelte';
import type { Component } from 'svelte';
export const git = 'https://github.com/jionnyMagiah/svelte-shadcn-components';

export type Credit = {
    url?: string;
    title?: string;
};
export type ComponentData = {
    title: string;
    desc?: string;
    credits?: Credit;
};
export type BlockData = {
    title: string;
    desc?: string;
    credits?: Credit;
    tags?: string[];
};
export type UtilsData = {
    title: string;
    desc?: string;
    credits?: Credit;
};

export type ComponentPage = ComponentData & {
    url: ResolvedPathname;
};
export type BlockPage = BlockData & {
    url: ResolvedPathname;
};
export type UtilsPage = UtilsData & {
    url: ResolvedPathname;
};

export type Group = {
    title: string;
    pages: Array<ComponentPage | BlockPage | UtilsPage>;
};

export const componentData = {
    'dice-ui': {
        'action-bar': {
            title: 'Action Bar',
            desc: 'A floating action bar that appears at the bottom or top of the viewport to display contextual actions for selected items.',
            credits: {
                title: 'Dice UI Action Bar',
                url: 'https://www.diceui.com/docs/components/action-bar'
            }
        },
        'angle-slider': {
            title: 'Angle Slider',
            desc: 'An interactive circular slider for selecting angles with support for single values and ranges.',
            credits: {
                title: 'Dice UI Angle Slider',
                url: 'https://www.diceui.com/docs/components/angle-slider'
            }
        },
        'avatar-group': {
            title: 'Avatar Group',
            desc: 'A component that arranges avatars with overlapping visual effects for displaying multiple users or items.',
            credits: {
                title: 'Dice UI Avatar Group',
                url: 'https://www.diceui.com/docs/components/avatar-group'
            }
        },
        'badge-overflow': {
            title: 'Badge Overflow',
            desc: 'A component that intelligently manages badge overflow by measuring available space and displaying only what fits with an overflow indicator.',
            credits: {
                title: 'Dice UI Badge Overflow',
                url: 'https://www.diceui.com/docs/components/badge-overflow'
            }
        },
        'circular-progress': {
            title: 'Circular Progress',
            desc: 'A circular progress indicator that displays completion progress in a ring format with support for indeterminate states.',
            credits: {
                title: 'Dice UI Circular Progress',
                url: 'https://www.diceui.com/docs/components/circular-progress'
            }
        },
        'color-picker': {
            title: 'Color Picker',
            desc: 'A color picker component that allows users to select colors using various input methods.',
            credits: {
                title: 'Dice UI Color Picker',
                url: 'https://www.diceui.com/docs/components/color-picker'
            }
        },
        'key-value': {
            title: 'Key Value',
            desc: 'A dynamic input component for managing key-value pairs with paste support and validation.',
            credits: {
                title: 'Dice UI Key Value',
                url: 'https://www.diceui.com/docs/components/key-value'
            }
        },
        'relative-time-card': {
            title: 'Relative Time Card',
            desc: 'A hover card that displays relative time relative to local time with timezone information.',
            credits: {
                title: 'Dice UI Relative Time Card',
                url: 'https://www.diceui.com/docs/components/relative-time-card'
            }
        },
        scoller: {
            title: 'Scroller',
            desc: 'A scrollable container with customizable scroll shadows and navigation buttons.',
            credits: {
                title: 'Dice UI Scroller',
                url: 'https://www.diceui.com/docs/components/scroller'
            }
        },
        stat: {
            title: 'Stat',
            desc: 'A flexible component for displaying key metrics and statistics with support for trends, indicators, and descriptions.',
            credits: {
                title: 'Dice UI Stat',
                url: 'https://www.diceui.com/docs/components/stat'
            }
        },
        status: {
            title: 'Status',
            desc: 'A flexible status indicator component with animated ping effect and color variants for displaying system states, user presence, and service health.',
            credits: {
                url: 'https://www.diceui.com/docs/components/status',
                title: 'Dice UI Status Component'
            }
        },
        stepper: {
            title: 'Stepper',
            desc: 'A component that guides users through a multi-step process with clear visual progress indicators.',
            credits: {
                title: 'Dice UI',
                url: 'https://www.diceui.com/docs/components/stepper'
            }
        },
        timeline: {
            title: 'Timeline',
            desc: 'A flexible timeline component for displaying chronological events with support for different orientations, RTL layouts, and visual states.',
            credits: {
                title: 'Dice UI Timeline',
                url: 'https://www.diceui.com/docs/components/timeline'
            }
        }
    },
    'ui-tripled': {
        'native-notification-bell': {
            title: 'Native Notification Bell',
            desc: 'Animated notification bell with badge and ringing effect.'
        }
    }
} satisfies Record<string, Record<string, ComponentData>>;

export const blockData = {
    originals: {
        login: {
            title: 'Login',
            desc: 'Login page',
            tags: ['login', 'users', 'sign-in']
        }
    }
} satisfies Record<string, Record<string, BlockData>>;

export const utilsData = {
    'dice-ui': {
        'visually-hidden-input': {
            title: 'Visually Hidden Input',
            desc: 'A hidden input that remains accessible to assistive technology and maintains form functionality.'
        }
    }
} satisfies Record<string, Record<string, UtilsData>>;
type Section = { title: string; groups: Group[]; icon: Component };

export const navigation = {
    'getting-started': {
        title: 'Getting Started',
        icon: Route,
        groups: [
            {
                title: 'Getting Started',
                pages: [
                    {
                        title: 'Introduction',
                        url: resolve('/(docs)/getting-started/introduction')
                    },
                    {
                        title: 'Setup',
                        url: resolve('/(docs)/getting-started/setup'),
                        desc: 'Set up svelte-shadcn-components in your project'
                    },
                    {
                        title: 'Changelog',
                        url: resolve('/(docs)/getting-started/changelog'),
                        desc: 'Changes to svelte-shadcn-components'
                    }
                ]
            }
        ]
    },
    components: {
        title: 'Components',
        icon: Puzzle,
        groups: [
            {
                title: 'Dice UI Components',
                pages: [
                    {
                        ...componentData['dice-ui']['action-bar'],
                        url: resolve('/(docs)/components/dice-ui/action-bar')
                    },
                    {
                        ...componentData['dice-ui']['angle-slider'],
                        url: resolve('/(docs)/components/dice-ui/angle-slider')
                    },
                    {
                        ...componentData['dice-ui']['avatar-group'],
                        url: resolve('/(docs)/components/dice-ui/avatar-group')
                    },
                    {
                        ...componentData['dice-ui']['badge-overflow'],
                        url: resolve(
                            '/(docs)/components/dice-ui/badge-overflow'
                        )
                    },
                    {
                        ...componentData['dice-ui']['circular-progress'],
                        url: resolve(
                            '/(docs)/components/dice-ui/circular-progress'
                        )
                    },
                    {
                        ...componentData['dice-ui']['color-picker'],
                        url: resolve('/(docs)/components/dice-ui/color-picker')
                    },
                    {
                        ...componentData['dice-ui']['key-value'],
                        url: resolve('/(docs)/components/dice-ui/key-value')
                    },
                    {
                        ...componentData['dice-ui']['relative-time-card'],
                        url: resolve(
                            '/(docs)/components/dice-ui/relative-time-card'
                        )
                    },
                    {
                        ...componentData['dice-ui']['scoller'],
                        url: resolve('/(docs)/components/dice-ui/scroller')
                    },
                    {
                        ...componentData['dice-ui']['stat'],
                        url: resolve('/(docs)/components/dice-ui/stat')
                    },
                    {
                        ...componentData['dice-ui']['status'],
                        url: resolve('/(docs)/components/dice-ui/status')
                    },
                    {
                        ...componentData['dice-ui']['stepper'],
                        url: resolve('/(docs)/components/dice-ui/stepper')
                    },
                    {
                        ...componentData['dice-ui']['timeline'],
                        url: resolve('/(docs)/components/dice-ui/timeline')
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
                        ...componentData['ui-tripled'][
                            'native-notification-bell'
                        ],
                        url: resolve(
                            '/(docs)/components/ui-tripled/native-notification-bell'
                        )
                    }
                ]
            }
        ]
    },
    blocks: {
        title: 'Blocks',
        icon: Blocks,
        groups: [
            {
                title: 'Originals',
                pages: [
                    {
                        ...blockData['originals']['login'],
                        url: resolve('/blocks/originals/login')
                    }
                ]
            }
        ]
    },
    packages: {
        title: 'Packages',
        icon: Package,
        groups: []
    },
    utils: {
        title: 'Utils',
        icon: Wrench,
        groups: [
            {
                title: 'Dice UI',
                pages: [
                    {
                        ...utilsData['dice-ui']['visually-hidden-input'],
                        url: resolve(
                            '/(docs)/utils/dice-ui/visually-hidden-input'
                        )
                    }
                ]
            }
        ]
    }
} satisfies Record<string, Section>;

export function concat(
    separator = ' ',
    ...words: Array<string | null | undefined>
) {
    return words.filter((w) => w).join(separator);
}
