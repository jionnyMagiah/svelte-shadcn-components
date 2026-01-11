<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import { mergeProps } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { tv } from 'tailwind-variants';
    import {
        getTimelineContextItemValue,
        getTimelineContextValue
    } from './context';

    const timelineDotVariants = tv({
        base: 'relative z-10 flex size-[var(--timeline-dot-size)] shrink-0 items-center justify-center rounded-full border-2 bg-background',

        variants: {
            status: {
                completed: 'border-primary',
                active: 'border-primary',
                pending: 'border-border'
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
                variant: 'alternate',
                orientation: 'vertical',
                isAlternateRight: false,
                class: 'absolute -right-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background'
            },
            {
                variant: 'alternate',
                orientation: 'vertical',
                isAlternateRight: true,
                class: 'absolute -left-[calc(var(--timeline-dot-size)/2-var(--timeline-connector-thickness)/2)] bg-background'
            },
            {
                variant: 'alternate',
                orientation: 'horizontal',
                class: 'row-start-2 bg-background'
            },
            {
                variant: 'alternate',
                status: 'completed',
                class: 'bg-background'
            },
            {
                variant: 'alternate',
                status: 'active',
                class: 'bg-background'
            }
        ],
        defaultVariants: {
            status: 'pending',
            orientation: 'vertical',
            variant: 'default',
            isAlternateRight: false
        }
    });

    export type TimelineDotProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...dotProps
    }: TimelineDotProps = $props();

    const { variant, orientation } = $derived(getTimelineContextValue()());
    const { status, isAlternateRight } = $derived(
        getTimelineContextItemValue()()
    );

    const mergedProps = $derived(
        mergeProps({
            'data-orientation': orientation,
            'data-slot': 'timeline-dot',
            'data-status': status,
            class: cn(
                timelineDotVariants({
                    status,
                    orientation,
                    variant,
                    isAlternateRight
                }),
                className
            ),
            dotProps
        })
    );
</script>

<div {...mergedProps}>
    {@render children?.()}
</div>
