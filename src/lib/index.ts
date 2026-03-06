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
export type PackageData = {
    title: string;
    desc?: string;
    credits?: Credit;
};

export type ComponentPage = ComponentData & {
    url: string;
};
export type BlockPage = BlockData & {
    url: string;
};
export type UtilsPage = UtilsData & {
    url: string;
};
export type PackagePage = PackageData & {
    url: string;
};

export type Group = {
    title: string;
    pages: Array<ComponentPage | BlockPage | UtilsPage | PackagePage>;
};

export const componentData = {
    'dice-ui': {
        // 'avatar-group': {
        //     title: 'Avatar Group',
        //     desc: 'A component that arranges avatars with overlapping visual effects for displaying multiple users or items.',
        //     credits: {
        //         title: 'Dice UI Avatar Group',
        //         url: 'https://www.diceui.com/docs/components/avatar-group'
        //     }
        // },
    },
    'kibo-ui': {
        banner: {
            title: 'Banner',
            desc: 'A banner is a full-width component that can be used to show a message and action to the user.',
            credits: {
                title: 'Kibo UI Banner',
                url: 'https://www.kibo-ui.com/components/banner'
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

export const packageData = {
    'dice-ui': {
        'checkbox-group': {
            title: 'checkbox-group',
            desc: 'Checkbox Group is a component that allows users to select multiple options from a list of options.',
            credits: {
                title: 'Dice UI Checkbox Group',
                url: 'https://github.com/sadmann7/diceui/blob/main/packages/checkbox-group/README.md'
            }
        }
    }
} satisfies Record<string, Record<string, PackageData>>;

export function concat(
    separator = ' ',
    ...words: Array<string | null | undefined>
) {
    return words.filter((w) => w).join(separator);
}
