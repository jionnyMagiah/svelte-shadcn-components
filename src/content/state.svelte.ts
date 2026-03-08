import type { Groups, navigation, Sections } from '$lib/navigation';

export const state: {
    state: {
        crumbs: { group: Groups; section: Sections; page: string } | null;
        group: keyof typeof navigation;
    };
} = $state({ state: { crumbs: null, group: 'Getting Started' } });

export const GROUP_LOCAL_STORAGE_KEY = 'shadcn-svelte-component-group';
