<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { CircularProgressContext } from './context.svelte';
    import { cn } from '$lib/utils';

    type CircularProgressIndicatorProps = HTMLAttributes<SVGSVGElement>;
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...indicatorProps
    }: CircularProgressIndicatorProps = $props();

    const context = CircularProgressContext.get();

    const size = $derived(context.opts.size.current);
    const state = $derived(context.opts.state.current);
    const max = $derived(context.opts.max.current);
    const min = $derived(context.opts.min.current);
    const value = $derived(context.opts.value.current);
    const percentage = $derived(context.opts.percentage.current);
</script>

<svg
    aria-hidden="true"
    focusable="false"
    viewBox={`0 0 ${size} ${size}`}
    data-state={state}
    data-value={value ?? undefined}
    data-max={max}
    data-min={min}
    data-percentage={percentage}
    width={size}
    height={size}
    {...indicatorProps}
    class={cn('-rotate-90 transform', className)}>{@render children?.()}</svg
>
