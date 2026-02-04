<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        CompareSliderContext,
        CompareSliderStoreContext
    } from './context.svelte';
    import CompareSliderLabel from './compare-slider-label.svelte';
    import { cn } from '$lib/utils';

    type CompareSliderBeforeProps = HTMLAttributes<HTMLDivElement> & {
        label?: string;
        ref?: HTMLDivElement | null;
    };
    let {
        class: className,
        children,
        style,
        label,
        ref = $bindable(),
        ...beforeProps
    }: CompareSliderBeforeProps = $props();

    const store = $derived(CompareSliderStoreContext.get());
    const context = $derived(CompareSliderContext.get());

    const value = $derived(store.getState().value);
    const orientation = $derived(context.opts.orientation.current);

    const labelId = $props.id();

    const isVertical = $derived(orientation === 'vertical');
    const clipPath = $derived(
        isVertical ? `inset(${value}% 0 0 0)` : `inset(0 0 0 ${value}%)`
    );
</script>

<div
    role="img"
    aria-labelledby={label ? labelId : undefined}
    aria-hidden={label ? undefined : 'true'}
    data-slot="compare-slider-before"
    data-orientation={orientation}
    {...beforeProps}
    bind:this={ref}
    class={cn('absolute inset-0 h-full w-full object-cover', className)}
    {style}
    style:clip-path={clipPath}
>
    {@render children?.()}
    {#if label}
        <CompareSliderLabel id={labelId} side="before">
            {label}
        </CompareSliderLabel>
    {/if}
</div>
