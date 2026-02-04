<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        CompareSliderContext,
        CompareSliderStoreContext
    } from './context.svelte';
    import CompareSliderLabel from './compare-slider-label.svelte';
    import { cn } from '$lib/utils';

    type CompareSliderAfterProps = HTMLAttributes<HTMLDivElement> & {
        label?: string;
        ref?: HTMLDivElement | null;
    };
    let {
        class: className,
        children,
        style,
        label,
        ref = $bindable(),
        ...afterProps
    }: CompareSliderAfterProps = $props();

    const store = $derived(CompareSliderStoreContext.get());
    const context = $derived(CompareSliderContext.get());

    const value = $derived(store.getState().value);
    const orientation = $derived(context.opts.orientation.current);

    const labelId = $props.id();

    const isVertical = $derived(orientation === 'vertical');
    const clipPath = $derived(
        isVertical
            ? `inset(0 0 ${100 - value}% 0)`
            : `inset(0 ${100 - value}% 0 0)`
    );
</script>

<div
    role="img"
    aria-labelledby={label ? labelId : undefined}
    aria-hidden={label ? undefined : 'true'}
    data-slot="compare-slider-after"
    data-orientation={orientation}
    {...afterProps}
    bind:this={ref}
    class={cn('absolute inset-0 h-full w-full object-cover', className)}
    {style}
    style:clip-path={clipPath}
>
    {@render children?.()}
    {#if label}
        <CompareSliderLabel id={labelId} side="after">
            {label}
        </CompareSliderLabel>
    {/if}
</div>
