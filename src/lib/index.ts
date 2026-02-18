
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
      
        'checkbox-group': {
            title: 'Checkbox Group',
            desc: 'A group of checkboxes that allows multiple selections with support for validation and accessibility.',
            credits: {
                title: 'Dice UI Checkbox Group',
                url: 'https://www.diceui.com/docs/components/checkbox-group'
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
        'color-swatch': {
            title: 'Color Swatch',
            desc: 'A color swatch component for displaying color values with support for transparency and various sizes.',
            credits: {
                title: 'Dice UI Color Swatch',
                url: 'https://www.diceui.com/docs/components/color-swatch'
            }
        },
        'compare-slider': {
            title: 'Compare Slider',
            desc: 'An interactive before/after comparison slider for comparing two elements side by side.',
            credits: {
                title: 'Dice UI Compare Slider',
                url: 'https://www.diceui.com/docs/components/compare-slider'
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
