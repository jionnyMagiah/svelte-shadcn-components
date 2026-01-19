import type { ResolvedPathname } from '$app/types';

export const state: {
    state: { crumbs: { text: string; url?: ResolvedPathname }[] };
} = $state({ state: { crumbs: [] } });
