<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        CompareSliderContext,
        CompareSliderStoreContext
    } from './context.svelte';
    import { cn } from '$lib/utils';
    import {
        ChevronDownIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
        ChevronUpIcon
    } from '@lucide/svelte';
    import { mergeProps } from 'svelte-toolbelt';

    type CompareSliderHandleProps = HTMLAttributes<HTMLDivElement> & {
        label?: string;
        ref?: HTMLDivElement | null;
    };
    let {
        class: className,
        children,
        style,
        label,
        ref = $bindable(),
        ...handleProps
    }: CompareSliderHandleProps = $props();

    const store = $derived(CompareSliderStoreContext.get());
    const context = $derived(CompareSliderContext.get());

    const value = $derived(store.getState().value);
    const orientation = $derived(context.opts.orientation.current);
    const interaction = $derived(context.opts.interaction.current);

    const isVertical = $derived(orientation === 'vertical');

    const mergedProps = $derived(
        mergeProps(
            { style: `${isVertical ? 'top' : 'left'}: ${value}%` },
            {
                role: 'presentation',
                'aria-hidden': 'true',
                'data-slot': 'compare-slider-handle',
                'data-orientation': orientation,
                class: cn(
                    'absolute z-50 flex items-center justify-center',
                    isVertical
                        ? 'left-0 h-10 w-full -translate-y-1/2'
                        : 'top-0 h-full w-10 -translate-x-1/2',
                    interaction === 'drag' &&
                        'cursor-grab active:cursor-grabbing',
                    className
                ),
                style
            },
            { ...handleProps }
        )
    );
</script>

<div bind:this={ref} {...mergedProps}>
    {#if children}
        {@render children()}
    {:else}
        <div
            class={cn(
                'absolute bg-background',
                isVertical
                    ? 'top-1/2 h-1 w-full -translate-y-1/2'
                    : 'left-1/2 h-full w-1 -translate-x-1/2'
            )}
        ></div>
        {#if interaction === 'drag'}
            <div
                class="z-50 flex aspect-square size-11 shrink-0 items-center justify-center rounded-full bg-background p-2 [&_svg]:size-4 [&_svg]:stroke-3 [&_svg]:text-muted-foreground [&_svg]:select-none"
            >
                {#if isVertical}
                    <div class="flex flex-col items-center">
                        <ChevronUpIcon />
                        <ChevronDownIcon />
                    </div>
                {:else}
                    <div class="flex items-center">
                        <ChevronLeftIcon />
                        <ChevronRightIcon />
                    </div>
                {/if}
            </div>
        {/if}
    {/if}
</div>
