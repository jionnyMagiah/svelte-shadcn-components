import { createContext } from 'svelte';
import type { SvelteMap } from 'svelte/reactivity';

export const [getAvatarContext, setAvatarContext] = createContext<string[]>();
