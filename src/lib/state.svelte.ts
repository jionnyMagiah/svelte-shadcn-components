import type { ResolvedPathname } from '$app/types';
import { navigation } from '$lib';

export const state: {
    state: {
        crumbs: { text: string; url?: ResolvedPathname }[];
        group: keyof typeof navigation;
    };
} = $state({ state: { crumbs: [], group: 'getting-started' } });

export const GROUP_LOCAL_STORAGE_KEY = 'shadcn-svelte-component-group';

export function isKeyOfNavigation(
    key: string,
    obj: typeof navigation
): key is keyof typeof navigation {
    return key in obj;
}
