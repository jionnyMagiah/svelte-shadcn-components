<!-- <script lang="ts" module>
    import type { Direction, Orientation } from 'bits-ui';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv } from 'tailwind-variants';
    import { setTimelineContext, setTimelineStoreContext } from './context';

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
    export type TimelineProps = HTMLAttributes<HTMLDivElement> & {
        dir?: Direction;
        orientation?: Orientation;
        variant?: Variant;
        activeIndex?: number;
    };
</script>

<script lang="ts">
    const {
        orientation = 'vertical',
        variant = 'default',
        dir: dirProp = 'ltr',
        activeIndex,
        children: Snippet,
        class: className,
        ...rootProps
    }: TimelineProps = $props();

    const listenersRef = $state(() => new Set<() => void>());
    const stateRef = $state(() => ({
        items: new Map()
    }));

    const context = setTimelineStoreContext({
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
        onItemRegister: (
            id: string,
            ref: React.RefObject<ItemElement | null>
        ) => {
            stateRef.current.items.set(id, ref);
            store.notify();
        },
        onItemUnregister: (id: string) => {
            stateRef.current.items.delete(id);
            store.notify();
        },
        getNextItemStatus: (id: string, activeIndex?: number) => {
            const entries = Array.from(stateRef.current.items.entries());
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
            const entries = Array.from(stateRef.current.items.entries());
            const sortedEntries = getSortedEntries(entries);
            return sortedEntries.findIndex(([key]) => key === id);
        }
    });
</script> -->
