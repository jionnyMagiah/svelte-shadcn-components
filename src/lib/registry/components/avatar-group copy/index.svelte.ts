import { createContext, type Snippet } from 'svelte';
import type { SvelteMap } from 'svelte/reactivity';
import { type AvatarRootProps } from 'bits-ui';

export const [getAvatarContext, setAvatarContext] =
    createContext<
        SvelteMap<string, { snippet?: Snippet; props: AvatarRootProps }>
    >();
