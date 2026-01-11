<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv } from 'tailwind-variants';
    import {
        getTimelineContextValue,
        getTimelineContextItemValue,
        getTimelineContextStore
    } from './context';
    import { cn } from '$lib/utils';

    const timelineConnectorVariants = tv({
        base: 'absolute z-0',
        variants: {
            isCompleted: {
                true: 'bg-primary',
                false: 'bg-border'
            },
            orientation: {
                vertical: '',
                horizontal: ''
            },
            variant: {
                default: '',
                alternate: ''
            },
            isAlternateRight: {
                true: '',
                false: ''
            }
        },
        compoundVariants: [
            {
                orientation: 'vertical',
                variant: 'default',
                class: 'start-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] top-3 h-[calc(100%+0.5rem)] w-[var(--timeline-connector-thickness)]'
            },
            {
                orientation: 'horizontal',
                variant: 'default',
                class: 'start-3 top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]'
            },
            {
                orientation: 'vertical',
                variant: 'alternate',
                isAlternateRight: false,
                class: 'top-2 -right-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]'
            },
            {
                orientation: 'vertical',
                variant: 'alternate',
                isAlternateRight: true,
                class: 'top-2 -left-[calc(var(--timeline-connector-thickness)/2)] h-full w-[var(--timeline-connector-thickness)]'
            },
            {
                orientation: 'horizontal',
                variant: 'alternate',
                class: 'top-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-[var(--timeline-connector-thickness)] w-[calc(100%+0.5rem)]'
            }
        ],
        defaultVariants: {
            isCompleted: false,
            orientation: 'vertical',
            variant: 'default',
            isAlternateRight: false
        }
    });

    export type TimelineConnectorProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
        forceMount?: boolean;
    };
</script>

<script lang="ts">
    const {
        class: className,
        children,
        forceMount = false,
        ...connectorProps
    }: TimelineConnectorProps = $props();
    const { orientation, variant, activeIndex } = $derived(
        getTimelineContextValue()()
    );
    const { id, status, isAlternateRight } = $derived(
        getTimelineContextItemValue()()
    );

    const store = $derived(getTimelineContextStore()());
    const nextItemStatus = $derived(store.getNextItemStatus(id, activeIndex));
    const isLastItem = $derived(nextItemStatus === undefined);

    const empty = $derived(!forceMount && isLastItem);

    const isConnectorCompleted = $derived(
        nextItemStatus === 'completed' || nextItemStatus === 'active'
    );
</script>

{#if !empty}
    <div
        aria-hidden="true"
        data-slot="timeline-connector"
        data-completed={isConnectorCompleted ? '' : undefined}
        data-status={status}
        data-orientation={orientation}
        {...connectorProps}
        class={cn(
            timelineConnectorVariants({
                isCompleted: isConnectorCompleted,
                orientation,
                variant,
                isAlternateRight
            }),
            className
        )}
    >
        {@render children?.()}
    </div>
{/if}
