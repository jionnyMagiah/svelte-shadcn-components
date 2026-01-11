<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Direction, Orientation } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { SvelteMap, SvelteSet } from 'svelte/reactivity';
    import { tv } from 'tailwind-variants';
    import { getItemStatus, getSortedEntries } from '.';
    import {
        setTimelineContextStore,
        setTimelineContextValue,
        type TimelineContextStore
    } from './context';

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
    export type TimelineProps = HTMLAttributes<HTMLDivElement> & {
        dir?: Direction;
        orientation?: Orientation;
        variant?: Variant;
        activeIndex?: number;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        orientation = 'vertical',
        variant = 'default',
        dir: dirProp = 'ltr',
        activeIndex = $bindable(),
        children,
        class: className,
        ...rootProps
    }: TimelineProps = $props();

    const listenersRef = new SvelteSet<() => void>();
    const stateRef = new SvelteMap<string, HTMLElement | null>();

    const storeValue: TimelineContextStore = $derived({
        subscribe: (cb) => {
            listenersRef.add(cb);
            return () => listenersRef.delete(cb);
        },
        getState: () => stateRef,
        notify: () => {
            for (const cb of listenersRef) {
                cb();
            }
        },
        onItemRegister: (id: string, ref: HTMLElement | null) => {
            stateRef.set(id, ref);
            storeValue.notify();
        },
        onItemUnregister: (id: string) => {
            stateRef.delete(id);
            storeValue.notify();
        },
        getNextItemStatus: (id: string, activeIndex?: number) => {
            const entries = Array.from(stateRef.entries());

            const sortedEntries = getSortedEntries(entries);

            const currentIndex = sortedEntries.findIndex(([key]) => key === id);
            if (
                currentIndex === -1 ||
                currentIndex === sortedEntries.length - 1
            ) {
                return undefined;
            }

            const nextItemIndex = currentIndex + 1;
            return getItemStatus(nextItemIndex, activeIndex);
        },
        getItemIndex: (id: string) => {
            const entries = Array.from(stateRef.entries());
            const sortedEntries = getSortedEntries(entries);
            return sortedEntries.findIndex(([key]) => key === id);
        }
    });
    setTimelineContextStore(() => storeValue);

    const value = $derived({ dir: dirProp, orientation, variant, activeIndex });
    setTimelineContextValue(() => value);
</script>

<div
    role="list"
    data-slot="timeline"
    data-orientation={orientation}
    data-variant={variant}
    dir={dirProp}
    class={cn(timelineVariants({ orientation, variant }), className)}
    {...rootProps}
>
    {@render children?.()}
</div>
