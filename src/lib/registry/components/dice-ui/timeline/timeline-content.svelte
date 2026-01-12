<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv } from 'tailwind-variants';
    import {
        getTimelineContextValue,
        getTimelineContextItemValue
    } from './context';
    import { cn } from '$lib/utils';

    const timelineContentVariants = tv({
        base: 'flex-1',
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
                variant: 'alternate',
                orientation: 'vertical',
                isAlternateRight: false,
                class: 'text-right'
            },
            {
                variant: 'alternate',
                orientation: 'horizontal',
                isAlternateRight: false,
                class: 'row-start-3 pt-2'
            },
            {
                variant: 'alternate',
                orientation: 'horizontal',
                isAlternateRight: true,
                class: 'row-start-1 pb-2'
            }
        ],
        defaultVariants: {
            orientation: 'vertical',
            variant: 'default',
            isAlternateRight: false
        }
    });

    export type TimelineContentProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...contentProps
    }: TimelineContentProps = $props();

    const { variant, orientation } = $derived(getTimelineContextValue()());
    // todo: check this
    const itemValue = $derived(getTimelineContextItemValue());
</script>

<div
    data-slot="timeline-content"
    data-status={itemValue().status}
    {...contentProps}
    class={cn(
        timelineContentVariants({
            orientation,
            variant,
            isAlternateRight: itemValue().isAlternateRight
        }),
        className
    )}
>
    {@render children?.()}
</div>
