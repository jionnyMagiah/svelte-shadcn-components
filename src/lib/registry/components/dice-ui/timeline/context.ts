import type { Direction, Orientation } from 'bits-ui';
import { createContext } from 'svelte';
import { tv } from 'tailwind-variants';

const timelineVariants = tv({
    base: 'relative flex [--timeline-connector-thickness:0.125rem] [--timeline-dot-size:0.875rem]',
    variants: {
        orientation: {
            vertical: 'flex-col',
            horizontal: 'flex-row items-start'
        },
        variant: {
            default: '',
            alternate: ''
        }
    },
    compoundVariants: [
        {
            orientation: 'vertical',
            variant: 'default',
            class: 'gap-6'
        },
        {
            orientation: 'horizontal',
            variant: 'default',
            class: 'gap-8'
        },
        {
            orientation: 'vertical',
            variant: 'alternate',
            class: 'relative w-full gap-3'
        },
        {
            orientation: 'horizontal',
            variant: 'alternate',
            class: 'items-center gap-4'
        }
    ],
    defaultVariants: {
        orientation: 'vertical',
        variant: 'default'
    }
});

type Variant = 'default' | 'alternate';
type Status = 'completed' | 'active' | 'pending';
export type TimelineContext = {
    dir: Direction;
    orientation: Orientation;
    variant: Variant;
    activeIndex?: number;
};

export const [getTimelineContext, setTimelineContext] =
    createContext<TimelineContext>();

interface StoreState {
    items: Map<string, HTMLElement>;
}

export type TimelineStore = {
    subscribe: (callback: () => void) => () => void;
    getState: () => StoreState;
    notify: () => void;
    onItemRegister: (id: string, ref: HTMLElement) => void;
    onItemUnregister: (id: string) => void;
    getNextItemStatus: (id: string, activeIndex?: number) => Status | undefined;
    getItemIndex: (id: string) => number;
};
export const [getTimelineStoreContext, setTimelineStoreContext] =
    createContext<TimelineStore>();
