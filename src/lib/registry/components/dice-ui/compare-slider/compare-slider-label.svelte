<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { CompareSliderContext } from './context.svelte';
    import { cn } from '$lib/utils';

    type CompareSliderLabelProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement | null;
        side?: 'before' | 'after';
    };
    let {
        class: className,
        children,
        style,
        side,
        ref = $bindable(),
        ...labelProps
    }: CompareSliderLabelProps = $props();

    const context = $derived(CompareSliderContext.get());

    const orientation = $derived(context.opts.orientation.current);
    const isVertical = $derived(orientation === 'vertical');
</script>

<div
    bind:this={ref}
    data-slot="compare-slider-label"
    class={cn(
        'absolute z-20 rounded-md border border-border bg-background/80 px-3 py-1.5 text-sm font-medium backdrop-blur-sm',
        isVertical
            ? side === 'before'
                ? 'top-2 left-2'
                : 'bottom-2 left-2'
            : side === 'before'
              ? 'top-2 left-2'
              : 'top-2 right-2',
        className
    )}
    {...labelProps}
>
    {@render children?.()}
</div>
