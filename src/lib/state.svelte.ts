import type { Groups, navigation, Sections } from './navigation';

export const state: {
    state: {
        crumbs: { group: Groups; section: Sections; page: string } | null;
        group: keyof typeof navigation;
        section: Sections | '';
    };
} = $state({ state: { crumbs: null, group: 'Components', section: '' } });

export const GROUP_LOCAL_STORAGE_KEY = 'shadcn-svelte-component-group';

export function isKeyOfNavigation(
    key: string,
    obj: typeof navigation
): key is keyof typeof navigation {
    return key in obj;
}
