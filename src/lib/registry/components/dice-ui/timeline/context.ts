import type { Direction, Orientation } from 'bits-ui';
import { createContext } from 'svelte';
import type { SvelteMap } from 'svelte/reactivity';
import type { Status, Variant } from '.';

export type TimelineContextStore = {
    subscribe: (callback: () => void) => () => void;
    getState: () => SvelteMap<string, HTMLElement | null>;
    notify: () => void;
    onItemRegister: (id: string, ref: HTMLElement) => void;
    onItemUnregister: (id: string) => void;
    getNextItemStatus: (id: string, activeIndex?: number) => Status | undefined;
    getItemIndex: (id: string) => number;
};

export const [getTimelineContextStore, setTimelineContextStore] =
    createContext<() => TimelineContextStore>();

export type TimelineContextValue = {
    dir: Direction;
    orientation: Orientation;
    variant: Variant;
    activeIndex?: number;
};

export const [getTimelineContextValue, setTimelineContextValue] =
    createContext<() => TimelineContextValue>();

export type TimelineContextItemValue = {
    id: string;
    status: Status;
    isAlternateRight: boolean;
};

export const [getTimelineContextItemValue, setTimelineContextItemValue] =
    createContext<() => TimelineContextItemValue>();
