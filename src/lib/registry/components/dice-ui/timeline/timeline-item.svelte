<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { type Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv } from 'tailwind-variants';
    import { getItemStatus } from '.';
    import {
        getTimelineContextStore,
        getTimelineContextValue,
        setTimelineContextItemValue
    } from './context';

    const timelineItemVariants = tv({
        base: 'relative flex',
        variants: {
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
                class: 'gap-3 pb-8 last:pb-0'
            },
            {
                orientation: 'horizontal',
                variant: 'default',
                class: 'flex-col gap-3'
            },
            {
                orientation: 'vertical',
                variant: 'alternate',
                isAlternateRight: false,
                class: 'w-1/2 gap-3 pr-6 pb-12 last:pb-0'
            },
            {
                orientation: 'vertical',
                variant: 'alternate',
                isAlternateRight: true,
                class: 'ml-auto w-1/2 flex-row-reverse gap-3 pb-12 pl-6 last:pb-0'
            },
            {
                orientation: 'horizontal',
                variant: 'alternate',
                class: 'grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3'
            }
        ],
        defaultVariants: {
            orientation: 'vertical',
            variant: 'default',
            isAlternateRight: false
        }
    });
    export type TimelineItemProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        class: className,
        id,
        ref = $bindable(),
        children,
        ...itemProps
    }: TimelineItemProps = $props();

    const { dir, orientation, variant, activeIndex } =
        getTimelineContextValue()();
    const store = $derived(getTimelineContextStore()());

    const propId = $props.id();
    const itemId = $derived(id ?? propId);
    let itemRef = $state<HTMLDivElement>(null!);

    const itemIndex = $derived(store.getItemIndex(itemId));

    let status = $derived(getItemStatus(itemIndex, activeIndex));

    $effect(() => {
        store.onItemRegister(itemId, itemRef);
        return () => {
            store.onItemUnregister(itemId);
        };
    });

    const isAlternateRight = $derived(
        variant === 'alternate' && itemIndex % 2 === 1
    );

    const itemValue = $derived({
        id: itemId,
        status: getItemStatus(itemIndex, activeIndex),
        isAlternateRight
    });
    setTimelineContextItemValue(() => itemValue);
</script>

<div
    role="listitem"
    aria-current={status === 'active' ? 'step' : undefined}
    data-slot="timeline-item"
    data-status={status}
    data-orientation={orientation}
    data-alternate-right={isAlternateRight ? true : undefined}
    id={itemId}
    {dir}
    bind:this={itemRef}
    {...itemProps}
    class={cn(
        timelineItemVariants({
            orientation,
            variant,
            isAlternateRight
        }),
        className
    )}
>
    {@render children?.()}
</div>
