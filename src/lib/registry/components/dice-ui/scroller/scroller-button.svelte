<script lang="ts" module>
    import { tv } from 'tailwind-variants';
    import type {
        ScrollDirection,
        ScrollerRootProps
    } from './scroller-root.svelte';
    import type { Component } from 'svelte';
    import {
        ChevronDown,
        ChevronLeft,
        ChevronRight,
        ChevronUp
    } from '@lucide/svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils';

    const scrollButtonVariants = tv({
        base: 'absolute z-10 transition-opacity [&>svg]:size-4 [&>svg]:opacity-80 hover:[&>svg]:opacity-100',
        variants: {
            direction: {
                up: 'top-2 left-1/2 -translate-x-1/2',
                down: 'bottom-2 left-1/2 -translate-x-1/2',
                left: 'top-1/2 left-2 -translate-y-1/2',
                right: 'top-1/2 right-2 -translate-y-1/2'
            }
        },
        defaultVariants: {
            direction: 'up'
        }
    });

    const directionToIcon: Record<ScrollDirection, Component> = {
        up: ChevronUp,
        down: ChevronDown,
        left: ChevronLeft,
        right: ChevronRight
    } as const;

    interface ScrollButtonProps extends HTMLButtonAttributes {
        direction: ScrollDirection;
        triggerMode?: 'press' | 'hover' | 'click';
        ref?: HTMLButtonElement;
    }
</script>

<script lang="ts">
    let {
        direction,
        class: className,
        triggerMode = 'press',
        onclick,
        ref = $bindable(null!),
        ...buttonProps
    }: ScrollButtonProps = $props();

    let autoScrollTimer = $state<number | null>(null);

    const onAutoScrollStart = (
        event?: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        if (autoScrollTimer !== null) return;

        if (triggerMode === 'press') {
            const timer = window.setInterval(onclick ?? (() => {}), 50);
            autoScrollTimer = timer;
        } else if (triggerMode === 'hover') {
            const timer = window.setInterval(() => {
                if (event) onclick?.(event);
            }, 50);
            autoScrollTimer = timer;
        }
    };
    const onAutoScrollStop = () => {
        if (autoScrollTimer === null) return;

        window.clearInterval(autoScrollTimer);
        autoScrollTimer = null;
    };
    const eventHandlers = $derived.by(() => {
        const triggerModeHandlers: Record<
            NonNullable<ScrollerRootProps['scrollTriggerMode']>,
            HTMLButtonAttributes
        > = {
            press: {
                onpointerdown: onAutoScrollStart,
                onpointerup: onAutoScrollStop,
                onpointerleave: onAutoScrollStop,
                onclick: () => {}
            },
            hover: {
                onpointerenter: onAutoScrollStart,
                onpointerleave: onAutoScrollStop,
                onclick: () => {}
            },
            click: {
                onclick
            }
        } as const;

        return triggerModeHandlers[triggerMode] ?? {};
    });

    $effect(() => {
        return () => onAutoScrollStop();
    });
    const Icon = $derived(directionToIcon[direction]);
</script>

<button
    type="button"
    {...buttonProps}
    {...eventHandlers}
    bind:this={ref}
    class={cn(scrollButtonVariants({ direction }), className)}
>
    <Icon />
</button>
